"use client"
import React from 'react'
import { Button } from './Button'

export interface HeaderProps {
  onSearch?: (q: string) => void
}

export const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  return (
    <header className="bg-white border-b border-gray-100">
      <div className="site-container px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <a href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center text-white font-bold">IN</div>
            <span className="text-text-primary font-semibold text-lg">INFNOVA</span>
          </a>
          <nav className="hidden md:flex gap-4 text-sm text-text-secondary">
            <a className="hover:text-text-primary" href="/courses">Courses</a>
            <a className="hover:text-text-primary" href="/about">About</a>
            <a className="hover:text-text-primary" href="/contact">Contact</a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center bg-muted rounded-md px-3 py-2 gap-2 w-[420px]">
            <input
              aria-label="Search courses"
              onChange={(e) => onSearch?.(e.target.value)}
              className="bg-transparent outline-none text-sm w-full text-text-primary"
              placeholder="Search courses, instructors..."
            />
          </div>

          <div className="hidden sm:flex gap-3">
            <a className="text-sm text-text-secondary hover:text-text-primary">Sign In</a>
            <Button variant="primary" size="sm">Enroll Now</Button>
          </div>

          <button className="sm:hidden p-2 rounded-md bg-muted">
            <svg className="w-5 h-5 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
      </div>
    </header>
  )
}
