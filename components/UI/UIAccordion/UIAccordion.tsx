import clsx from "clsx"
import { useRouter } from "next/router"
import React, { FC, ReactNode, useState } from "react"
import { RightArrowIcon } from "../icons"

interface InputProps {
    title: string
    children?: ReactNode
    className?: string
    icon?: JSX.Element
    sr?: boolean
}

const UIAccordion: FC<InputProps> = ({ title, children, className, sr }) => {
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()
    const handleClick = () => {
        setIsOpen(!isOpen)
    }
    return (
        <div
            className={clsx(className, " cursor-pointer", sr ? "sr-only" : "flex flex-col w-full ")}
            onClick={handleClick}
        >
            <div className="flex justify-between items-center">
                <h4>{title}</h4>
                <RightArrowIcon className={clsx(isOpen && "rotate-90")} />
            </div>

            {isOpen && <div className="w-full">{children}</div>}
        </div>
    )
}

export { UIAccordion }
