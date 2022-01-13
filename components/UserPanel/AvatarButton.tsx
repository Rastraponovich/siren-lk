import { FC, memo } from "react"
import Image from "next/image"

import Link from "next/link"
import clsx from "clsx"
import { useEvent } from "effector-react/scope"
import { switchLoginModal } from "@/models/loginPanel"

type TSize = "small" | "medium" | "large"
const RATIO = 26
type TSizeDict = {
    [key in TSize]: {
        height: number
        width: number
    }
}

const SizeDict: TSizeDict = {
    small: { height: RATIO, width: RATIO },
    medium: { height: RATIO * 2, width: RATIO * 2 },
    large: { height: RATIO * 3, width: RATIO * 3 },
}

interface AvatarButtonProps {
    href: string
    image?: string
    size?: TSize
    className?: string
    square?: boolean
    color?: string
    isAuth: boolean
}

const AvatarButton: FC<AvatarButtonProps> = ({
    image = "/assets/image/avatarDefault.svg",
    size = "medium",
    className,
    square,
    href,
    isAuth,
}) => {
    const openLoginModal = useEvent(switchLoginModal)

    return (
        <>
            {isAuth ? (
                <Link href={href}>
                    <a
                        className={clsx(
                            className,
                            "flex items-center text-[color:#595959]",
                            square ? "rounded" : "rounded-full"
                        )}
                    >
                        <Image src={image} alt="аватар" {...SizeDict[size]} layout="fixed" />
                    </a>
                </Link>
            ) : (
                <button onClick={openLoginModal} className={className}>
                    <Image src={image} alt="аватар" {...SizeDict[size]} layout="fixed" />
                </button>
            )}
        </>
    )
}

export default memo(AvatarButton)
