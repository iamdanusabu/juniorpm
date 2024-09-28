export function Card({ children, className, ...props }) {
  return (
    <div 
      className={`bg-white dark:bg-gray-800 shadow rounded-lg p-6 ${className}`} 
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, ...props }) {
  return <div className="mb-4" {...props}>{children}</div>
}

export function CardTitle({ children, ...props }) {
  return <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white" {...props}>{children}</h3>
}

export function CardDescription({ children, ...props }) {
  return <p className="text-sm text-gray-600 dark:text-gray-300 mb-4" {...props}>{children}</p>
}

export function CardContent({ children, ...props }) {
  return <div className="space-y-4" {...props}>{children}</div>
}
