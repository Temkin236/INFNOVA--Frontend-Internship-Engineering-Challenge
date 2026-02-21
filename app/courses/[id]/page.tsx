import React from 'react'
import CourseDetail from '../../../components/CourseDetail'
import { notFound } from 'next/navigation'

type Props = { params: { id: string } }

async function getCourse(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/courses/${id}`, { cache: 'no-store' })
  if (!res.ok) return null
  return res.json()
}

export default async function CoursePage({ params }: Props) {
  const course = await getCourse(params.id)
  if (!course) return notFound()

  return (
    <main>
      <CourseDetail course={course} />
    </main>
  )
}
