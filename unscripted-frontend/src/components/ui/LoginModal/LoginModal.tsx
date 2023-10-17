import { FC } from "react"

interface LoginModalProps {
  className?: string
}

export const LoginModal: FC<LoginModalProps> = ({ children, className }) => {
  return <div className={className}>{children}</div>
}