import React, { FC, ReactNode } from "react"

interface InputProps {
    component?: any
    className?: string
    children?: ReactNode
    onSort?(): void
    sorting?: boolean
    colspan?: string
}

const UICell: FC<InputProps> = ({
    component = "td",
    className,
    children,
    sorting,
    onSort,
    colspan,
}) => {
    const Component = component

    const sortingProps = sorting ? onSort : null
    const styles = sorting ? { cursor: "pointer" } : null

    return (
        <Component className={className} style={styles} onClick={sortingProps} colSpan={colspan}>
            {children}
        </Component>
    )
}

export { UICell }
