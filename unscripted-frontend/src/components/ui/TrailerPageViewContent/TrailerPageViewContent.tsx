import { FC } from "react"

interface TrailerPageViewContentProps {
  className?: string
}

export const TrailerPageViewContent: FC<TrailerPageViewContentProps> = ({ children, className }) => {
  return <div className={className}>{children}</div>
}