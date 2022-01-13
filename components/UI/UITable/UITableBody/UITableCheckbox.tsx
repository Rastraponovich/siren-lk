import clsx from "clsx"
import React, { FC } from "react"

interface InputProps {
    checked?: boolean
    onChange?(): any
    value?: any
    className?: string
    checkedClassName?: string
}

const UITableCheckbox: FC<InputProps> = ({
    checked,
    onChange,
    value,
    className,
    checkedClassName,
}) => {
    return (
        <label
            className={clsx(
                checked && checkedClassName,
                checked && "before:border-[color:#EDA84D]",
                // checked &&
                //     `bg-[image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23EDA84D' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e")]`,
                className,
                "flex items-center select-none",
                "before:contents block w-4 h-4 flex-shrink-0 flex-grow-0",
                "border border-solid border-black border-opacity-60 bg-no-repeat bg-center "
                //bg-size[50%]
            )}
        >
            <input
                checked={checked}
                type="checkbox"
                onChange={onChange}
                value={value}
                className="absolute z-auto opacity-0"
            />
        </label>
    )
}

export { UITableCheckbox }
