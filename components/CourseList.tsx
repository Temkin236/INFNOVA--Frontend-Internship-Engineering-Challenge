import React from 'react'
import { Course } from '../types/course'
import { CourseCard } from './CourseCard'
import { CourseCardSkeleton } from './CourseCardSkeleton'
import { ErrorAlert } from './ErrorAlert'

export interface CourseListProps {
  courses?: Course[] | null
  isLoading?: boolean
  error?: Error | null
  onCourseClick?: (c: Course) => void
  columns?: number
}

export const CourseList: React.FC<CourseListProps> = ({ courses = [], isLoading = false, error = null, onCourseClick, columns = 3 }) => {
  const colsClass = columns === 4 ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4' : columns === 3 ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'
  if (error) {
    return <ErrorAlert message={error.message || 'Failed to load courses'} />
  }

  if (isLoading) {
    return (
      <div className={`grid ${colsClass} gap-6`}>
        {Array.from({ length: 8 }).map((_, i) => <CourseCardSkeleton key={i} />)}
      </div>
    )
  }

  return (
    <div className={`grid ${colsClass} gap-6`}>
      {courses?.map((course) => (
        <CourseCard key={course.id} course={course} onClick={onCourseClick} />
      ))}
    </div>
  )
}
