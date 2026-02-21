<#
  clean-and-push-noninteractive.ps1
  Non-interactive script to: backup mirror, remove large folders from history,
  run garbage collection, and force-push cleaned history to a remote.

  IMPORTANT: This script REWRITES GIT HISTORY (destructive). All collaborators
  must re-clone after the force-push. Only run if you understand the risk.

  Usage (edit $RemoteURL below, then run from repo root):
    powershell -ExecutionPolicy Bypass -File .\scripts\clean-and-push-noninteractive.ps1
#>

Set-StrictMode -Version Latest

# === CONFIGURE BEFORE RUNNING ===
# Remote URL to push cleaned history to. If empty the script will try to use 'origin'.
$RemoteURL = 'https://github.com/Temkin236/INFNOVA--Frontend-Internship-Engineering-Challenge.git'

# Backup location (bare mirror)
$BackupDir = Join-Path $env:USERPROFILE "INFNOVA-backup-$(Get-Date -Format yyyyMMdd-HHmmss).git"

function Fail($msg) { Write-Error $msg; exit 1 }

if (-not (Test-Path .git)) { Fail 'Not a git repository. Run this script from the repository root.' }

Write-Output "Creating bare mirror backup at: $BackupDir"
git clone --mirror . $BackupDir
if ($LASTEXITCODE -ne 0) { Fail 'Failed to create mirror backup.' }

Write-Output 'Ensuring git-filter-repo is installed (pip install git-filter-repo)'
try { git filter-repo --version > $null 2>&1 } catch {
  python -m pip install --upgrade git-filter-repo 2>$null
  pip install --upgrade git-filter-repo 2>$null
}
try { git filter-repo --version > $null 2>&1 } catch { Fail 'git-filter-repo not available. Install it and re-run.' }

Write-Output 'Adding common ignores to .gitignore (node_modules, .next, dist, .cache)'
$ignores = @('node_modules/','.next/','dist/','.cache/')
foreach ($i in $ignores) { if (-not (Select-String -Path .gitignore -Pattern [regex]::Escape($i) -Quiet -ErrorAction SilentlyContinue)) { Add-Content .gitignore $i } }

Write-Output 'Remove tracked folders from index (non-destructive local files)'
git rm -r --cached node_modules 2>$null
if ($LASTEXITCODE -ne 0) { Write-Output 'no cached node_modules' }
git rm -r --cached .next 2>$null
if ($LASTEXITCODE -ne 0) { Write-Output 'no cached .next' }
git rm -r --cached dist 2>$null
if ($LASTEXITCODE -ne 0) { Write-Output 'no cached dist' }
git add .gitignore -A 2>$null
git add -A 2>$null
git commit -m "chore: add ignores and remove tracked build/deps from index" 2>$null
if ($LASTEXITCODE -ne 0) { Write-Output 'no index changes to commit' }

Write-Output 'Running git reflog expire and gc (lightweight)'
git reflog expire --expire=now --all 2>$null
git gc --prune=now --aggressive 2>$null

Write-Output 'Rewriting history to permanently remove: node_modules, .next, dist, .cache'
git filter-repo --invert-paths --path node_modules --path .next --path dist --path .cache --force
if ($LASTEXITCODE -ne 0) { Fail 'git-filter-repo failed' }

Write-Output 'Performing aggressive garbage collection'
git reflog expire --expire=now --all
git gc --prune=now --aggressive

if (-not $RemoteURL) { Fail 'Remote URL not configured. Edit $RemoteURL at top of this script.' }

Write-Output "Setting remote to: $RemoteURL"
git remote remove origin 2>$null
git remote add origin $RemoteURL
if ($LASTEXITCODE -ne 0) { Fail 'Failed to add remote' }

Write-Output 'Force-pushing cleaned history to origin/main (this will overwrite remote history)'
git branch -M main 2>$null
git push -u origin main --force
if ($LASTEXITCODE -ne 0) { Fail 'Push failed. Check your credentials and network and re-run.' }

Write-Output 'Done. Remote history has been rewritten. All collaborators must re-clone the repository.'
