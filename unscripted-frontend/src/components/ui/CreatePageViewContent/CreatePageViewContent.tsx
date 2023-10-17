import { FC } from "react"

interface CreatePageViewContentProps {
  className?: string
}

export const CreatePageViewContent: FC<CreatePageViewContentProps> = ({ children, className }) => {
  return <div className={className}>{children}</div>
}