import { FC } from "react"

interface ScriptCardProps {
  className?: string
}

export const ScriptCard: FC<ScriptCardProps> = ({ children, className }) => {
  return <div className={className}>{children}</div>
}