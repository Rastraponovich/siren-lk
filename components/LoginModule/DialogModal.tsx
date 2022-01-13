import { Dialog, Transition } from "@headlessui/react"
import { FC, Fragment, memo, ReactNode, useRef } from "react"

interface DialogModalProps {
    children: ReactNode
    isOpen: boolean
    swithIsOpen(): void
}

const DialogModal: FC<DialogModalProps> = ({ children, isOpen, swithIsOpen }) => {
    const ref = useRef()

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                initialFocus={ref}
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto bg-white/75"
                onClose={swithIsOpen}
            >
                <div className="min-h-screen px-0 sm:px-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="inline-block h-screen align-middle" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div
                            ref={ref}
                            className="h-screen sm:h-full inline-flex justify-center w-full max-w-2xl  overflow-hidden text-left align-middle transition-all transform bg-[#2d2d2d] shadow-xl"
                        >
                            {children}
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}
export default memo(DialogModal)
