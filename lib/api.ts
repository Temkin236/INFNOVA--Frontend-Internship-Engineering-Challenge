import type { Course } from '../types/course'

const REMOTE_API_BASE = 'https://infnova-course-api.vercel.app'

export async function getCourses(): Promise<Course[]> {
  // Try the public bonus API first, fall back to local mock API if unavailable
  try {
    const res = await fetch(`${REMOTE_API_BASE}/api/courses`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Remote API returned error')
    return res.json()
  } catch (err) {
    const res = await fetch('/api/courses', { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch courses')
    return res.json()
  }
}

export async function getCourseById(id: string): Promise<Course> {
  try {
    const res = await fetch(`${REMOTE_API_BASE}/api/courses/${id}`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Remote API returned error')
    return res.json()
  } catch (err) {
    const res = await fetch(`/api/courses/${id}`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch course')
    return res.json()
  }
}
