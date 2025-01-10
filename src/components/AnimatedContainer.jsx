import React from 'react'

    export function AnimatedContainer({ children, className = '' }) {
      return (
        <div className={`animate-fade-in ${className}`}>
          {children}
        </div>
      )
    }

    export function AnimatedList({ children }) {
      return (
        <div className="animate-stagger">
          {children}
        </div>
      )
    }

    export function AnimatedListItem({ children }) {
      return (
        <div className="animate-fade-up">
          {children}
        </div>
      )
    }
