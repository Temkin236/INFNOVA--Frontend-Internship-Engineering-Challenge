import React from 'react'

export interface CourseCardSkeletonProps {
  compact?: boolean
}

export const CourseCardSkeleton: React.FC<CourseCardSkeletonProps> = ({ compact = false }) => {
  return (
    <div className="bg-white rounded-lg-2xl shadow-card overflow-hidden animate-pulse">
      <div className="w-full h-40 bg-gray-200" />
      <div className={`p-4 ${compact ? 'pb-3' : 'pb-5'}`}>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-3 bg-gray-200 rounded w-1/2 mb-3" />
        <div className="flex justify-between items-center">
          <div className="h-3 bg-gray-200 rounded w-24" />
          <div className="h-8 bg-gray-200 rounded w-16" />
        </div>
      </div>
    </div>
  )
}
