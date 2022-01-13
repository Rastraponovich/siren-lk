import clsx from "clsx"
import React, { FC, ReactNode } from "react"

interface InputProps {
    children?: ReactNode
    direction?: "row" | "col"
    className?: string
}

const UIButtonGroup: FC<InputProps> = ({ children, direction = "row", className }) => {
    return (
        <div
            className={clsx(
                className,
                "flex w-full",
                direction === "row" && "flex-row last:mr-4 last:mb-4"
            )}
        >
            {children}
        </div>
    )
}

export { UIButtonGroup }
