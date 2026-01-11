import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export default function Card({ children, className = '', onClick }: CardProps) {
  const baseStyles = 'bg-white rounded-xl shadow-md hover:shadow-butter transition-shadow overflow-hidden'

  return (
    <div
      className={`${baseStyles} ${className} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
