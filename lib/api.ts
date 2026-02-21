import type { Course } from '../types/course'

export async function getCourses(): Promise<Course[]> {
  const res = await fetch('/api/courses', { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch courses')
  return res.json()
}

export async function getCourseById(id: string): Promise<Course> {
  const res = await fetch(`/api/courses/${id}`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch course')
  return res.json()
}
