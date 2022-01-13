import React, { FC, ButtonHTMLAttributes, DetailedHTMLProps, MouseEventHandler } from "react"
import Image from "next/image"
import clsx from "clsx"

type TSize = "small" | "standard" | "lagre"

const RATIO = 24
const DEFAULT_IMG = "/assets/image/cross.svg"

type TSizeDict = {
    [key in TSize]: {
        height: number
        width: number
    }
}
const sizeDict: TSizeDict = {
    standard: {
        height: RATIO,
        width: RATIO,
    },
    small: {
        height: RATIO / 2,
        width: RATIO / 2,
    },
    lagre: {
        height: RATIO * 1.5,
        width: RATIO * 1.5,
    },
}

interface InputProps
    extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    icon?: string
    className?: string
    onClick: MouseEventHandler<HTMLButtonElement>
    size?: TSize
    height?: number
    width?: number
    alt?: string
    layout?: "fixed" | "fill" | "intrinsic" | "responsive"
}

const UIImageButton: FC<InputProps> = (props) => {
    const {
        icon = DEFAULT_IMG,
        className,
        onClick,
        size = "standard",
        height,
        width,
        alt,
        layout,
    } = props

    return (
        <button
            className={clsx(className, "bg-transparent border-none outline-none")}
            onClick={onClick}
        >
            <Image
                src={icon}
                height={height ? height : sizeDict[size].height}
                width={width ? width : sizeDict[size].width}
                alt={alt}
                layout={layout}
            />
        </button>
    )
}

export { UIImageButton }
