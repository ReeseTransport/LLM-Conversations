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
