import clsx from "clsx"
import React, { FC, MouseEventHandler, ReactNode } from "react"

interface InputProps {
    children: ReactNode
    component?: any
    onClick: MouseEventHandler<HTMLDivElement>
    className?: string
}

const UIIconButton: FC<InputProps> = ({
    children,
    component: Component = "button",
    onClick,
    className,
}) => {
    return (
        <Component onClick={onClick} className={clsx(className, "cursor-pointer")}>
            {children}
        </Component>
    )
}

export { UIIconButton }
