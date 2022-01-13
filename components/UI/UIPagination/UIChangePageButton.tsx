import clsx from "clsx"
import Link from "next/link"
import { useRouter } from "next/router"
import { FC, memo, ReactNode } from "react"

interface UIChangePageButtonProps {
    pageNumber: number
    children: ReactNode
    type: "prev" | "next"
    totalPages?: number
}

const UIChangePageButton: FC<UIChangePageButtonProps> = ({
    pageNumber,
    type,
    totalPages,
    children,
}) => {
    const router = useRouter()
    const direction = {
        prev: pageNumber === 1 ? pageNumber : pageNumber - 1,
        next: pageNumber === totalPages ? pageNumber : pageNumber + 1,
    }

    return (
        <Link
            href={{
                pathname: `${router.pathname}`,
                query: { ...router.query, page: direction[type] },
            }}
            replace
            shallow
            passHref
        >
            <a
                className={clsx(
                    type === "prev" && pageNumber === 1 && "opacity-75 cursor-auto",
                    type === "next" && pageNumber === totalPages && "opacity-75 cursor-auto",

                    "flex items-center  bg-transparent border-none outline-none text-[color:#4f4f4f] mx-8",
                    " font-normal capitalize text-center text-base leading-6"
                )}
            >
                {children}
            </a>
        </Link>
    )
}

export default memo(UIChangePageButton)
