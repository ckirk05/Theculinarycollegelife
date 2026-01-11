import React from 'react'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'category' | 'difficulty'
  className?: string
  onClick?: () => void
}

export default function Badge({ children, variant = 'default', className = '', onClick }: BadgeProps) {
  const baseStyles = 'inline-block text-sm px-3 py-1 rounded-full transition-colors'

  const variantStyles = {
    default: 'bg-butter-100 text-butter-800',
    category: 'bg-butter-200 text-butter-900 font-medium',
    difficulty: 'bg-gray-100 text-gray-700',
  }

  return (
    <span
      className={`${baseStyles} ${variantStyles[variant]} ${className} ${onClick ? 'cursor-pointer hover:opacity-80' : ''}`}
      onClick={onClick}
    >
      {children}
    </span>
  )
}
