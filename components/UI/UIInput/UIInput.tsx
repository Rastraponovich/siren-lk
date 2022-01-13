import clsx from "clsx"
import React, { FC, ChangeEvent } from "react"

interface InputProps {
    className?: string
    id?: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    value?: string
    disabled?: boolean
    type?: string
}

const UIInput: FC<InputProps> = ({
    className,
    onChange,
    value,
    disabled = false,
    type = "text",
    id,
}) => {
    return (
        <input
            className={clsx(
                className,
                disabled && "bg-transparent border-none outline-none",
                "bg-transparent border border-solid rounded"
            )}
            onChange={onChange}
            value={value}
            disabled={disabled}
            type={type}
            id={id}
        />
    )
}

export { UIInput }
