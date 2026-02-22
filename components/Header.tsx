"use client"
import React, { useState } from 'react'
import { Button } from './Button'
import { useRouter } from 'next/navigation'

export const Header: React.FC = () => {
  const [q, setQ] = useState('')
  const router = useRouter()

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = q.trim()
    if (trimmed) router.push(`/courses?search=${encodeURIComponent(trimmed)}`)
    else router.push('/courses')
  }

  return (
    <header className="bg-white border-b border-gray-100">
      <div className="site-container px-6 py-4 grid grid-cols-3 items-center">
        {/* Left: logo */}
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-3">
            <img src="/Logo.svg" alt="INFNOVA logo" className="w-10 h-10 rounded-md" />
          </a>
        </div>

        {/* Center: nav (centered) */}
        <nav className="hidden md:flex justify-center gap-8 text-sm text-text-secondary">
          <a className="hover:text-text-primary" href="/courses">Courses</a>
          <a className="hover:text-text-primary" href="/about">About</a>
          <a className="hover:text-text-primary" href="/contact">Contact</a>
        </nav>

        {/* Right: actions */}
        <div className="flex items-center justify-end gap-4">
          <a className="text-sm text-text-secondary hover:text-text-primary">Sign In</a>
          <a href="#" className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-full shadow-sm hover:opacity-95">Enroll Now</a>
        </div>
      </div>
    </header>
  )
}
