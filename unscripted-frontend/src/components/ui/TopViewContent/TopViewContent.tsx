import { FC } from "react"

interface TopViewContentProps {
  className?: string
}

export const TopViewContent: FC<TopViewContentProps> = ({ children, className }) => {
  return <div className={className}>{children}</div>
}