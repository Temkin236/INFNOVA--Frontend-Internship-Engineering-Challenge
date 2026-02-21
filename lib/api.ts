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
  // Try the public bonus API first, fall back to local mock API if unavailable
  try {
    const res = await fetch(`${REMOTE_API_BASE}/api/courses`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Remote API returned error')
    const data = await res.json()
    if (Array.isArray(data)) return data.map(normalizeRemoteCourse)
    throw new Error('Unexpected data from remote API')
  } catch (err) {
    const res = await fetch('/api/courses', { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch courses')
    const data = await res.json()
    if (Array.isArray(data)) return data.map((d: any) => ({ ...d, image: d.image || d.thumbnail }))
    return []
  }
}

export async function getCourseById(id: string): Promise<Course> {
  try {
    const res = await fetch(`${REMOTE_API_BASE}/api/courses/${id}`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Remote API returned error')
    const data = await res.json()
    return normalizeRemoteCourse(data)
  } catch (err) {
    const res = await fetch(`/api/courses/${id}`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch course')
    const data = await res.json()
    return { ...data, image: data.image || data.thumbnail }
  }
}
