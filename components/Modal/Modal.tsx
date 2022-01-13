import clsx from "clsx"
import React, { memo, FC, ReactNode } from "react"
import ReactModal from "react-modal"

interface ModalProps {
    children: ReactNode
    isOpen: boolean
    closeModal(): void
    className?: string
}

const Modal: FC<ModalProps> = ({ className, children, isOpen, closeModal }) => {
    return (
        <ReactModal
            isOpen={isOpen}
            portalClassName=""
            overlayClassName="p-8 fixed flex overflow-y-auto items-center justify-center inset-0 bg-black/30 transition-opacity duration-150 ease-in-out"
            className={clsx("max-w-max", className)}
            bodyOpenClassName=""
            htmlOpenClassName="overflow-hidden"
            onRequestClose={closeModal}
            contentLabel="Minimal Modal Example"
            closeTimeoutMS={150}
        >
            <div className="h-screen sm:h-full inline-flex justify-center w-full max-w-2xl  overflow-hidden text-left align-middle transition-all transform bg-[#2d2d2d] shadow-xl">
                {children}
            </div>
        </ReactModal>
    )
}

export default memo(Modal)
