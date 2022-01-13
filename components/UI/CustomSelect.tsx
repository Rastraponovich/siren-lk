import React, { FC, useState, Fragment, memo } from "react"

import clsx from "clsx"

import { Listbox, Transition } from "@headlessui/react"
import { Store } from "effector"

type DictType = {
    id: number
    value: string | number
}

interface InputProps {
    options?: DictType[]
    labelClassName?: string
    controlClassName?: string
    label?: string
    optionsClassName?: string
    rootClassName?: string
    optionClassName?: string
    onChange?(value: any): any
    cursorClassName?: string
    activeCursorClassName?: string
    value?: any
}
const CustomSelect: FC<InputProps> = ({
    options,
    labelClassName,
    label,
    controlClassName,
    optionsClassName,
    optionClassName,
    rootClassName,
    cursorClassName,
    activeCursorClassName = "fill-[#4d4d4d]",
    onChange,
    value,
}) => {
    return (
        <Listbox value={value} onChange={onChange}>
            {({ open }) => (
                <div className={clsx("flex flex-col justify-center", rootClassName)}>
                    <Listbox.Label className={clsx(labelClassName)}>{label}</Listbox.Label>
                    <div className="mt-1 relative">
                        <Listbox.Button
                            className={clsx(
                                controlClassName,
                                "custom_select__control",
                                open && "border-[color:#4d4d4d]"
                            )}
                        >
                            <span className="flex text-base">
                                <span className="mx-3 block truncate">{value}</span>
                            </span>
                            <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <svg
                                    width="25"
                                    height="24"
                                    viewBox="0 0 25 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g opacity="1">
                                        <path
                                            d="M9.57944 11.71L12.1694 14.3C12.5594 14.69 13.1894 14.69 13.5794 14.3L16.1694 11.71C16.7994 11.08 16.3494 10 15.4594 10H10.2794C9.38944 10 8.94944 11.08 9.57944 11.71Z"
                                            fill="#DDDEE4"
                                            className={clsx(
                                                "custom_select__indicator",
                                                cursorClassName,
                                                open && activeCursorClassName
                                            )}
                                        />
                                    </g>
                                </svg>
                            </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options
                                className={clsx("custom_select__options", optionsClassName)}
                            >
                                {options.map((item) => (
                                    <Listbox.Option
                                        key={item.id}
                                        className={({ active }) =>
                                            clsx(active, optionClassName, "custom_select__option")
                                        }
                                        value={item.value}
                                    >
                                        {({ selected }) => (
                                            <>
                                                <div className="flex items-center">
                                                    <span
                                                        className={clsx(
                                                            selected
                                                                ? "font-semibold"
                                                                : "font-normal",
                                                            "ml-3 block truncate"
                                                        )}
                                                    >
                                                        {item.value}
                                                    </span>
                                                </div>
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </div>
            )}
        </Listbox>
    )
}

export default memo(CustomSelect)
