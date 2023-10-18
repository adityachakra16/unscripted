import { FC } from "react"

interface SmallScriptCardProps {
  className?: string
}

export const SmallScriptCard: FC<SmallScriptCardProps> = ({ children, className }) => {
  return <div className={className}>{children}</div>
}