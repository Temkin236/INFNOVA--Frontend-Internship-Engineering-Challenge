<#
  clean-and-push.ps1
  - Adds common gitignore entries
  - Removes tracked `node_modules`, `.next`, `dist` from index
  - Commits the change, runs lightweight gc
  - Optionally rewrites history with git-filter-repo (destructive)
  - Creates a local mirror backup before history rewrite
  Usage: Run from repo root in PowerShell:
    .\scripts\clean-and-push.ps1
#>

Set-StrictMode -Version Latest
Write-Output "Running clean-and-push script in: $(Get-Location)"

function Ensure-InRepo {
  if (-not (Test-Path .git)) {
    Write-Error "This directory does not look like a git repository. Run this script from the repository root."
    exit 1
  }
}

function Append-IgnoreIfMissing([string]$line) {
  if (-not (Test-Path .gitignore)) { New-Item -Path .gitignore -ItemType File -Force | Out-Null }
  $exists = Select-String -Path .gitignore -Pattern "^\s*" + [regex]::Escape($line) -Quiet -ErrorAction SilentlyContinue
  if (-not $exists) { Add-Content -Path .gitignore -Value $line; Write-Output "Appended to .gitignore: $line" }
}

Ensure-InRepo

# 1) Add common ignores
$ignores = @("node_modules/", ".next/", "dist/", ".cache/", ".env", ".env.local", ".DS_Store", ".vscode/")
foreach ($i in $ignores) { Append-IgnoreIfMissing $i }

# 2) Remove tracked folders from index (non-destructive locally)
Write-Output "Removing tracked folders from index (node_modules, .next, dist) if present..."
git rm -r --cached node_modules 2>$null || Write-Output "no cached node_modules"
git rm -r --cached .next 2>$null || Write-Output "no cached .next"
git rm -r --cached dist 2>$null || Write-Output "no cached dist"

# Stage .gitignore and any removals
git add .gitignore -A 2>$null
git add -A 2>$null
try {
  git commit -m "chore: ignore build output and remove node_modules/.next from index" | Out-Null
  Write-Output "Committed .gitignore and index cleanup (if changes existed)."
} catch {
  Write-Output "No index changes to commit."
}

# 3) Lightweight cleanup
Write-Output "Running git reflog expire and gc..."
git reflog expire --expire=now --all 2>$null
git gc --prune=now --aggressive 2>$null

# 4) Attempt a normal push
Write-Output "Attempting to push to 'origin' (this will prompt for auth if required)."
if (-not (git remote get-url origin 2>$null)) {
  $remote = Read-Host "No 'origin' remote found. Enter remote URL to add (or press Enter to skip push)"
  if ($remote -and $remote.Trim().Length -gt 0) { git remote add origin $remote }
}

if (git remote get-url origin 2>$null) {
  Write-Output "Pushing to origin/main (non-force)..."
  $pushResult = git push -u origin main 2>&1
  Write-Output $pushResult
  if ($LASTEXITCODE -eq 0) { Write-Output "Push succeeded."; exit 0 }
  Write-Warning "Push failed or is still slow. You can try the history-rewrite cleanup (destructive)."
} else {
  Write-Warning "No origin remote configured; skipping push step."
}

# 5) Ask about history rewrite
$choice = Read-Host "Rewrite history to remove large files permanently? This is destructive (y/N)"
if ($choice -notin @('y','Y')) { Write-Output "Skipping history rewrite. You can re-run the script later to perform it."; exit 0 }

# 6) Make a mirror backup before rewriting
$backupDir = Join-Path $env:USERPROFILE "INFNOVA-backup-$(Get-Date -Format yyyyMMdd-HHmmss).git"
Write-Output "Creating a local bare mirror backup at: $backupDir"
git clone --mirror . $backupDir

# 7) Ensure git-filter-repo is installed
Write-Output "Checking for git-filter-repo..."
try {
  git filter-repo --version 2>$null | Out-Null
} catch {
  Write-Output "git-filter-repo not found. Attempting to install via pip..."
  python -m pip install --upgrade git-filter-repo 2>$null || pip install --upgrade git-filter-repo 2>$null
}

try {
  git filter-repo --version 2>$null
} catch {
  Write-Error "git-filter-repo is not available. Install it manually (pip install git-filter-repo) and re-run this script. Aborting."
  exit 1
}

Write-Output "Rewriting history to remove paths: node_modules, .next, dist, .cache"
# run with --force to allow rewrite in some environments
git filter-repo --invert-paths --path node_modules --path .next --path dist --path .cache --force

Write-Output "History rewrite complete. Running aggressive gc..."
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# 8) Force push rewritten history
if (-not (git remote get-url origin 2>$null)) {
  $remote = Read-Host "Enter remote URL to push rewritten history to (e.g. https://github.com/your/repo.git)"
  if ($remote -and $remote.Trim().Length -gt 0) { git remote add origin $remote }
}

if (git remote get-url origin 2>$null) {
  Write-Output "Force-pushing rewritten history to origin/main (this will overwrite remote history)."
  git push -u origin main --force
  Write-Output "Force push issued. If it succeeded, your remote no longer contains the removed folders in history."
} else {
  Write-Error "No remote configured to push to. Aborting after rewrite."
}

Write-Output "Done. If you force-pushed, other collaborators must re-clone the repository." 
