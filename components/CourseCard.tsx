"use client"
import React from 'react'
import type { Course } from '../types/course'

export interface CourseCardProps {
  course: Course
  onClick?: (course: Course) => void
  compact?: boolean
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onClick, compact = false }) => {
  return (
    <article onClick={() => onClick?.(course)} className="card-base cursor-pointer hover:shadow-lg transition">
      <div className="relative">
        <img src={course.image} alt={course.title} className="w-full h-36 object-cover rounded-t-lg-2xl" />
        {course.category && (
          <span className="absolute top-3 left-3 bg-white/95 text-xs text-primary px-2 py-0.5 rounded-md shadow-sm uppercase font-medium">
            {course.category}
          </span>
        )}
        {course.badges?.[0] && (
          <span className="absolute top-3 right-3 bg-[linear-gradient(90deg,#7c3aed,#06b6d4)] text-white text-xs px-2 py-0.5 rounded-full shadow-sm">
            {course.badges[0]}
          </span>
        )}
      </div>
      <div className={`p-4 ${compact ? 'pb-3' : 'pb-5'}`}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-text-primary font-semibold text-sm md:text-base line-clamp-2">{course.title}</h3>
            <p className="text-text-secondary text-xs mt-1">{course.instructor?.name} • {course.level}</p>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold text-text-primary">{typeof course.price === 'number' ? new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(course.price) : course.price ?? 'Free'}</div>
            <div className="text-xs text-text-secondary">{course.students ?? 0} students</div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-3 text-xs text-text-secondary">
            <span className="inline-flex items-center gap-1">
              <svg className="w-4 h-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" /></svg>
              <span>{(course.rating ?? 0).toFixed(1)}</span>
            </span>
            <span>{course.lessonsCount ?? 0} lessons</span>
          </div>

          <div>
            <button className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-md">Preview</button>
          </div>
        </div>
      </div>
    </article>
  )
}
