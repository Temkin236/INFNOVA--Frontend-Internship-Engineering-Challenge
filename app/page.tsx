import React from 'react'
import { HeroBanner } from '../components/HeroBanner'
import { CoursesContainer } from '../components/CoursesContainer'

export default function Page() {
  return (
    <>
      <HeroBanner />
      <section className="mt-8">
        <div className="site-container">
          <div className="mb-4 text-sm text-text-secondary">Showing 8 courses</div>
          <CoursesContainer />
        </div>
      </section>
    </>
  )
}
