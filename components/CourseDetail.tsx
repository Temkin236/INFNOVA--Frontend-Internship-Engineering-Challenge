import React from 'react'
import { Course } from '../types/course'
import Button from './Button'

type Props = {
  course: Course
}

export default function CourseDetail({ course }: Props) {
  return (
    <div className="site-container py-6">
      <a href="/courses" className="text-sm text-gray-600 mb-4 inline-block">← Back to Courses</a>

      <div className="bg-primary text-white rounded-md overflow-hidden shadow-md flex flex-col md:flex-row md:items-center md:justify-between p-6 md:p-8 mb-6">
        <div className="md:flex-1">
          <div className="text-xs uppercase tracking-wider opacity-90">{course.category || 'Cloud Computing'}</div>
          <h2 className="text-2xl md:text-3xl font-semibold mt-2">{course.title}</h2>
          <p className="mt-2 text-sm opacity-95 max-w-2xl">{course.description}</p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-white font-semibold">{course.instructor?.name?.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
              <div className="text-sm">
                <div className="font-medium">Instructor: {course.instructor?.name}</div>
                <div className="text-xs opacity-90">{course.duration || '8 weeks'} • {course.enrolled ?? '2,015'} enrolled</div>
              </div>
            </div>

            <span className="inline-block bg-white/10 px-3 py-1 rounded-full text-xs">Intermediate Level</span>
          </div>
        </div>

        <div className="mt-6 md:mt-0 md:ml-6 w-full md:w-72 flex-shrink-0">
          <div className="bg-black rounded-md overflow-hidden h-40 md:h-28">
            <img src={course.image || '/placeholder-course.jpg'} alt="course" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card-base">
            <h3 className="font-semibold text-lg">What You'll Learn</h3>
            <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(course.whatYouLearn || ['AWS','CI/CD','System Design','Docker','Infrastructure']).map((t, i) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                  <span className="w-5 h-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs">✓</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card-base">
            <h3 className="font-semibold text-lg">Course Description</h3>
            <p className="mt-3 text-sm text-gray-700">{course.longDescription || course.description}</p>
          </div>

          <div className="card-base">
            <h3 className="font-semibold text-lg">Your Instructor</h3>
            <div className="mt-3 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center font-semibold">{course.instructor?.name?.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
              <div>
                <div className="font-medium">{course.instructor?.name}</div>
                <div className="text-sm text-gray-600">{course.instructor?.bio || 'Expert instructor with years of experience.'}</div>
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="card-base border-orange-50">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Enroll Today</div>
                <div className="font-semibold text-xl mt-1">Join {course.enrolled ?? 2015} students already enrolled</div>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              <Button variant="primary" size="md">Enroll Now</Button>
              <Button variant="secondary" size="md">Add to Wishlist</Button>
            </div>
          </div>

          <div className="card-base">
            <h4 className="font-medium">This course includes:</h4>
            <ul className="mt-3 text-sm text-gray-700 space-y-2">
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
