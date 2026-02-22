"use client"
import React, { useEffect, useMemo, useState } from 'react'
import type { Course } from '../types/course'
import { getCourses } from '../lib/api'
import { CourseList } from './CourseList'
import { SkeletonGrid } from './SkeletonGrid'
import { ErrorAlert } from './ErrorAlert'
import { useSearchParams } from 'next/navigation'

export const CoursesContainer: React.FC = () => {
  const [courses, setCourses] = useState<Course[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const searchParams = useSearchParams()
  const query = searchParams?.get('search') ?? ''

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

  const displayed = useMemo(() => {
    const q = (query || '').trim().toLowerCase()
    if (!q) return courses
    return courses.filter((c) => {
      if (!c) return false
      const inTitle = c.title?.toLowerCase().includes(q)
      const inInstructor = c.instructor?.name?.toLowerCase().includes(q)
      const inCategory = c.category?.toLowerCase().includes(q)
      const inTags = (c.tags || []).some(t => t.toLowerCase().includes(q))
      return !!(inTitle || inInstructor || inCategory || inTags)
    })
  }, [courses, query])

  return <CourseList courses={displayed} columns={3} />
}
