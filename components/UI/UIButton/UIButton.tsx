import clsx from "clsx"
import { FC, ReactNode, ButtonHTMLAttributes } from "react"

interface InputProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    className?: string
    fullWidth?: boolean
    variant?: string
}

const UIButton: FC<InputProps> = ({
    variant = "primary",
    className,
    children,
    fullWidth = false,
    ...props
}) => {
    return (
        <button
            className={clsx(
                "button",
                className,
                variant === "primary" && "button--primary",
                fullWidth && "w-full"
            )}
            {...props}
        >
            {children}
        </button>
    )
}

export { UIButton }
