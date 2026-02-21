import type { Course } from '../types/course'

const REMOTE_API_BASE = 'https://infnova-course-api.vercel.app'

type RemoteCourse = {
  id: string
  title: string
  instructor?: string
  level?: string
  duration?: string
  thumbnail?: string
  rating?: number
  enrolled?: number
  category?: string
  description?: string
  skills?: string[]
}

function normalizeRemoteCourse(r: RemoteCourse): Course {
  return {
    id: r.id,
    title: r.title,
    image: r.thumbnail,
    instructor: r.instructor ? { id: r.instructor.replace(/\s+/g, '-').toLowerCase(), name: r.instructor } : undefined,
    level: (r.level as Course['level']) || undefined,
    duration: r.duration,
    rating: r.rating,
    students: r.enrolled,
    category: r.category,
    description: r.description,
    tags: r.skills,
  }
}

export async function getCourses(): Promise<Course[]> {
  const res = await fetch(`${REMOTE_API_BASE}/api/courses`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch courses from remote API')
  const data = await res.json()
  if (!Array.isArray(data)) throw new Error('Unexpected response from remote API')
  return data.map(normalizeRemoteCourse)
}

export async function getCourseById(id: string): Promise<Course> {
  const res = await fetch(`${REMOTE_API_BASE}/api/courses/${id}`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch course from remote API')
  const data = await res.json()
  return normalizeRemoteCourse(data)
}
