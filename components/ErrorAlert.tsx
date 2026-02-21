"use client"
import React from 'react'
import { Button } from './Button'

export interface ErrorAlertProps {
  message?: string
  onRetry?: () => void
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ message = 'Something went wrong', onRetry }) => {
  return (
    <div className="bg-red-50 border border-red-100 text-red-700 rounded-md p-4 flex items-center justify-between">
      <div className="flex items-start gap-3">
        <svg className="w-5 h-5 mt-0.5 text-red-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.68-1.36 3.445 0l6.518 11.596C19.478 16.98 18.62 19 16.957 19H3.043c-1.663 0-2.521-2.02-1.263-4.305L8.257 3.1zM11 7a1 1 0 10-2 0v4a1 1 0 002 0V7zm-1 8a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z" clipRule="evenodd"/></svg>
        <div className="text-sm">{message}</div>
      </div>
      {onRetry && <Button variant="ghost" size="sm" onClick={onRetry}>Retry</Button>}
    </div>
  )
}
