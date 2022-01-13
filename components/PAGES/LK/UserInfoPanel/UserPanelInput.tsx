import clsx from "clsx"
import { useStore } from "effector-react"
import { FC, InputHTMLAttributes, memo, ReactNode } from "react"

import { $userForUserPanel, $disabledFieldsUserPanel } from "@/models/user"

import { PencilIcon } from "@/components/UI/icons"

interface UserPanelInputProps extends InputHTMLAttributes<HTMLInputElement> {
    inputClassName?: string
    onButtonClick?(id: string): void
    buttonImage?: ReactNode
    caption: string
    captionClassName?: string
    rootClassName?: string
    iconSize?: string
}

const UserPanelInput: FC<UserPanelInputProps> = ({
    rootClassName,
    captionClassName,
    name,
    caption,
    buttonImage,
    type = "text",
    id,
    onChange,
    inputClassName,
    onButtonClick,
    iconSize,
}) => {
    const field = useStore($userForUserPanel)[id]
    const isDisabled = useStore($disabledFieldsUserPanel)[id]

    return (
        <label className={clsx(rootClassName, "grid grid-cols-5 content-center")}>
            <span
                className={clsx(
                    "text-sm leading-[18px] font-medium col-span-1 self-center",
                    captionClassName
                )}
                onClick={() => onButtonClick(id)}
            >
                {caption}
            </span>

            <input
                name={name}
                type={type}
                id={id}
                disabled={isDisabled}
                onChange={onChange}
                onBlur={() => onButtonClick(id)}
                className={clsx(inputClassName, isDisabled && "border-transparent", "self-center")}
                value={field}
            />

            <button
                className="col-span-1 self-center col-end-6 justify-self-end"
                onClick={() => onButtonClick(id)}
            >
                <PencilIcon size={iconSize} active={!isDisabled} />
            </button>
        </label>
    )
}

export default memo(UserPanelInput)
