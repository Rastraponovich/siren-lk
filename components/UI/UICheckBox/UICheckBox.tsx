import React, { FC, ChangeEventHandler } from "react"
interface InputProps {
    caption: string
    checked?: boolean
    onChange?: ChangeEventHandler<HTMLInputElement>
    className?: string
    labelClassName?: string
}

const UICheckBox: FC<InputProps> = ({
    caption,
    checked = false,
    onChange,
    className,
    labelClassName,
}) => {
    return (
        <label className={className}>
            <input type="checkbox" checked={checked} onChange={onChange} className="mr-3.5" />
            <span className={labelClassName}>{caption}</span>
        </label>
    )
}

export { UICheckBox }
