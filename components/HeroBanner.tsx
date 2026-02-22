"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export const HeroBanner: React.FC = ({ title = 'Explore Our Courses', subtitle = 'Master new skills with expert-led courses designed for the modern learner. Start your learning journey today with INFNOVA Academy.' }: any) => {
  const [q, setQ] = useState('')
  const router = useRouter()

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = q.trim()
    if (trimmed) router.push(`/courses?search=${encodeURIComponent(trimmed)}`)
    else router.push('/courses')
  }

  return (
    <section className="full-bleed">
      {/* full-bleed orange band */}
      <div className="bg-primary text-white w-full">
        <div className="site-container py-14 md:py-20">
          <div className="max-w-3xl">
            <h1 className="heading-display text-4xl md:text-5xl font-semibold">{title}</h1>
            <p className="mt-3 text-sm md:text-base opacity-95">{subtitle}</p>
          </div>
        </div>
      </div>

      {/* overlapping white search box centered inside container */}
      <div className="site-container overlap-search">
        <form onSubmit={submit} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex items-center gap-3">
          <div className="flex-1 flex items-center gap-3">
            <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35"/><circle cx="11" cy="11" r="6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <input value={q} onChange={(e) => setQ(e.target.value)} className="flex-1 bg-transparent outline-none text-text-primary text-sm" placeholder="Search courses, instructors..." aria-label="Search courses" />
          </div>
          <div className="flex items-center gap-2">
            <button type="submit" className="px-3 py-1 bg-primary text-white rounded-md">Search</button>
            <div className="w-10 h-8 border border-gray-100 rounded-md bg-gray-50" />
          </div>
        </form>
      </div>
    </section>
  )
}
