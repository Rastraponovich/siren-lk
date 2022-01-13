import clsx from "clsx"
import React, { memo, FC, DetailedHTMLProps, SelectHTMLAttributes } from "react"

interface InputProps
    extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
    options?: any[]
    label?: string
    field?: any
    touched?: any
    // meta?: FieldMetaProps<any>
    error?: any
    labelClassName?: string
    selectClassName?: string
}

const UISelect: FC<InputProps> = ({
    selectClassName,
    labelClassName,
    options,
    label,
    ...props
}) => {
    return (
        <label className="flex flex-col">
            {label && <span className={clsx(labelClassName, "mb-4")}>{label}</span>}
            <select
                className={clsx(
                    selectClassName,
                    "p-4 bg-transparent border border-solid border-[color:#DDDEE4] text-[color:#121621] leading-5 text-base rounded"
                )}
                {...props}
            >
                {options.map((option) => (
                    <option key={option.id} value={option.value}>
                        {option.value}
                    </option>
                ))}
            </select>
            {/* {props.meta.touched && props.meta.error ? (
                <span className="error">{props.meta.error}</span>
            ) : null} */}
        </label>
    )
}

export { UISelect }
