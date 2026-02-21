'use client'
import React, { useEffect, useState } from 'react'
import type { Course } from '../types/course'
import { getCourses } from '../lib/api'
import { CourseList } from './CourseList'
import { SkeletonGrid } from './SkeletonGrid'
import { ErrorAlert } from './ErrorAlert'

export const CoursesContainer: React.FC = () => {
  const [courses, setCourses] = useState<Course[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let mounted = true
    setIsLoading(true)
    getCourses()
      .then((data) => {
        if (!mounted) return
        setCourses(data)
      })
      .catch((err) => {
        if (!mounted) return
        setError(err)
      })
      .finally(() => {
        if (!mounted) return
        setIsLoading(false)
      })
    return () => { mounted = false }
  }, [])

  if (error) return <ErrorAlert message={error.message} onRetry={() => { setError(null); setIsLoading(true); getCourses().then(setCourses).catch(setError).finally(() => setIsLoading(false)) }} />

  if (isLoading || !courses) return <SkeletonGrid count={8} columns={3} />

  return <CourseList courses={courses} columns={3} />
}
