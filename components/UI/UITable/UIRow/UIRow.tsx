import React, { FC, ReactNode } from "react"

interface InputProps {
    children?: ReactNode
    className?: string
}

const UIRow: FC<InputProps> = ({ children, className }) => {
    return <tr className={className}>{children}</tr>
}

export { UIRow }
