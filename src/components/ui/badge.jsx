export function Badge({ children, className, ...props }) {
  return <span className={`inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 ${className}`} {...props}>{children}</span>
}
