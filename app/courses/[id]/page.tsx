import React from 'react'
import CourseDetail from '../../../components/CourseDetail'
import { notFound } from 'next/navigation'
import { getCourseById } from '../../../lib/api'

type Props = { params: { id: string } }

export default async function CoursePage({ params }: Props) {
  // Use the shared API helper which queries the external bonus API and falls back
  // to the local API. This avoids 404s when the local mock uses different ids.
  const course = await getCourseById(params.id)
  if (!course) return notFound()

  return (
    <main>
      <CourseDetail course={course} />
    </main>
  )
}
