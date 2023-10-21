import React from "react"

type Props = {
  children: React.ReactNode
  width?: string
}

const Modal = ({ children, width }: Props) => {
  return (
    // we add modal-bottom and modal-middle classes to make it responsive
    //add modal-open for now to test the modal
    <div
      className={`modal modal-bottom sm:modal-middle modal-open ${
        width ? width : null
      }`}
    >
      {/* we want any content for this modal layout so we just pass the children */}
      <div className="modal-box">{children}</div>
    </div>
  )
}

export default Modal
