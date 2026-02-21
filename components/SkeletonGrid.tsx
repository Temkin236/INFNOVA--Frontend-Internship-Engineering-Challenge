import React from 'react'
import { CourseCardSkeleton } from './CourseCardSkeleton'

export interface SkeletonGridProps {
  count?: number
  columns?: number
}

export const SkeletonGrid: React.FC<SkeletonGridProps> = ({ count = 8, columns = 3 }) => {
  const colsClass = columns === 4 ? 'grid-cols-4' : columns === 3 ? 'grid-cols-3' : 'grid-cols-2'
  return (
    <div className={`grid ${colsClass} gap-6`}>
      {Array.from({ length: count }).map((_, i) => <CourseCardSkeleton key={i} />)}
    </div>
  )
}
