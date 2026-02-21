"use client"
import React from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', size = 'md', className = '', children, ...props }) => {
  const base = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none'
  const sizes: Record<string, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-3 text-base',
  }
  const variants: Record<string, string> = {
    primary: `bg-primary text-white hover:bg-primary-600`,
    secondary: `bg-white border border-gray-200 text-text-primary hover:bg-muted`,
    ghost: `bg-transparent text-primary hover:bg-muted`,
  }
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
