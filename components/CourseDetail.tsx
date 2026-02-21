import React from 'react'
import { Course } from '../types/course'
import Button from './Button'

type Props = {
  course: Course
}

export default function CourseDetail({ course }: Props) {
  return (
    <div className="site-container py-8">
      <a href="/courses" className="text-sm text-text-secondary mb-4 inline-block">← Back to Courses</a>

      <div className="bg-primary text-white rounded-md overflow-hidden shadow-lg grid grid-cols-1 md:grid-cols-3 gap-6 p-6 md:p-10 mb-6 items-center">
        <div className="md:col-span-2">
          <div className="text-xs uppercase tracking-wider opacity-90">{course.category || 'Cloud Computing'}</div>
          <h2 className="text-3xl md:text-4xl font-semibold mt-2 leading-tight">{course.title}</h2>
          <p className="mt-3 text-sm md:text-base opacity-95 max-w-3xl">{course.description}</p>

          <div className="mt-5 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center text-white font-semibold">{course.instructor?.name?.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
              <div className="text-sm">
                <div className="font-medium">Instructor: {course.instructor?.name}</div>
                <div className="text-xs opacity-90">{course.duration || '8 weeks'} • {course.students ?? course.enrolled ?? '2,015'} enrolled</div>
              </div>
            </div>

            <span className="inline-block bg-white/10 px-3 py-1 rounded-full text-xs">{course.level ?? 'Intermediate'}</span>
          </div>
        </div>

        <div className="w-full md:w-80 md:justify-self-end">
          <div className="bg-black rounded-lg overflow-hidden shadow-md h-48 md:h-40">
            <img src={course.image || '/placeholder-course.jpg'} alt={course.title} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card-base">
            <h3 className="font-semibold text-lg">What You'll Learn</h3>
            <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(course.tags || course.tags === undefined ? course.tags || course.tags : course.tags) /* noop to satisfy TS */}
              {(course.tags && course.tags.length ? course.tags : course.tags || course.tags || course.tags || course.tags) /* keep fallback below */}
              {( (course.tags && course.tags.length) ? course.tags : (course.tags || course.tags) ) /* redundant safe-check */}
              {
                ((course.tags && course.tags.length) ? course.tags : course.tags || ['AWS','Docker','System Design','CI/CD','Infrastructure']).map((t: string, i: number) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <span className="w-6 h-6 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-xs">✓</span>
                    <span>{t}</span>
                  </li>
                ))
              }
            </ul>
          </div>

          <div className="card-base">
            <h3 className="font-semibold text-lg">Course Description</h3>
            <p className="mt-3 text-sm text-text-secondary">{course.description}</p>
          </div>

          <div className="card-base">
            <h3 className="font-semibold text-lg">Your Instructor</h3>
            <div className="mt-3 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center font-semibold">{course.instructor?.name?.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
              <div>
                <div className="font-medium">{course.instructor?.name}</div>
                <div className="text-sm text-text-secondary">{course.instructor?.bio || 'Expert Cloud Computing professional with hands-on experience.'}</div>
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="card-base border border-gray-100">
            <div>
              <div className="text-sm text-text-secondary">Enroll Today</div>
              <div className="font-semibold text-xl mt-1">Join {course.students ?? course.enrolled ?? 2015} students already enrolled</div>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              <Button variant="primary" size="md">Enroll Now</Button>
              <Button variant="ghost" size="md">Add to Wishlist</Button>
            </div>
          </div>

          <div className="card-base">
            <h4 className="font-medium">This course includes:</h4>
            <ul className="mt-3 text-sm text-text-secondary space-y-2">
              <li>9 weeks of content</li>
              <li>Certificate of completion</li>
              <li>Access on mobile and desktop</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
