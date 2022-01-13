import clsx from "clsx"
import React, { memo, FC, ReactNode } from "react"

interface UILKTablePaperProps {
    className?: string
    children?: ReactNode
}

const UILKTablePaper: FC<UILKTablePaperProps> = ({ className, children }) => {
    return (
        <div
            className={clsx(" bg-white px-20 pt-8 pb-[76px] rounded-r-lg -ml-20 mb-10", className)}
        >
            {children}
        </div>
    )
}

export default memo(UILKTablePaper)
