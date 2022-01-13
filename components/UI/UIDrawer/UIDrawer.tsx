import clsx from "clsx"
import { FC, memo, ReactNode } from "react"
import { UIIconButton } from ".."
import { CloseIcon } from "../icons"

interface DrawerProps {
    children: ReactNode
    isOpen: boolean
    setIsOpen(): void
}

const UIDrawer: FC<DrawerProps> = ({ children, isOpen, setIsOpen }) => {
    return (
        <aside
            className={clsx(
                "fixed overflow-hidden bg-gray-900/25 inset-0 ease-in-out transition-all opacity-0 duration-500 ",
                isOpen ? "opacity-100 z-50" : "delay-150 translate-x-full"
            )}
        >
            <UIIconButton
                onClick={setIsOpen}
                className={clsx(
                    "flex bg-transparent border-none outline-none absolute top-8",
                    "left-8 z-10 sm:hidden",
                    isOpen
                        ? "transition-opacity opacity-100 duration-500"
                        : "transition-all opacity-0  " //медиа адоптация нужна
                )}
            >
                <CloseIcon fill="sm:fill-white" />
            </UIIconButton>
            <section
                className={clsx(
                    " w-screen max-w-lg right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform",
                    isOpen ? "translate-x-0 " : "translate-x-full "
                )}
            >
                <div className="relative w-screen max-w-lg py-10  px-4 items-center flex flex-col space-y-6 lg:overflow-y-hidden h-full">
                    {children}
                </div>
            </section>
            <div
                className={clsx(
                    " w-screen h-full cursor-pointer transition-opacity duration-500",
                    isOpen ? "opacity-100" : "opacity-0"
                )}
                onClick={setIsOpen}
            ></div>
        </aside>
    )
}

export default memo(UIDrawer)
