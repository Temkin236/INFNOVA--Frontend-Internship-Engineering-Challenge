import { NextResponse } from 'next/server'
import type { Course } from '../../../../types/course'

const MOCK_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Cloud Engineering with AWS',
    category: 'Cloud Computing',
    level: 'Intermediate',
    shortDescription: 'Learn modern cloud patterns and AWS services',
    lessonsCount: 12,
    duration: '6h',
    image: '/images/aws.jpg',
    rating: 4.7,
    students: 2145,
    price: 129,
    badges: ['Popular'],
    instructor: { id: 'i1', name: 'Samuel C.' },
  },
]

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params
  const course = MOCK_COURSES.find((c) => c.id === id)
  if (!course) return NextResponse.json({ message: 'Not found' }, { status: 404 })
  return NextResponse.json(course, { status: 200 })
}
