import { NextResponse } from 'next/server'
import type { Course } from '../../../types/course'

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

export async function GET() {
  // Replace with db call in production
  return NextResponse.json(MOCK_COURSES, { status: 200 })
}
