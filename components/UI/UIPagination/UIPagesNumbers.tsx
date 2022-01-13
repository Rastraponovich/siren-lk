import clsx from "clsx"
import Link from "next/link"
import { useRouter } from "next/router"
import { FC, memo } from "react"

interface UIPagesNumbersProps {
    totalPages: number
    currentPage: number
}

const UIPagesNumbers: FC<UIPagesNumbersProps> = ({ totalPages, currentPage }) => {
    const { query, pathname } = useRouter()

    return (
        <div className="flex items-center">
            {[...Array(totalPages).keys()].map((pageNumber) => (
                <Link
                    key={pageNumber}
                    href={{
                        pathname: `${pathname}`,
                        query: { ...query, page: pageNumber + 1 },
                    }}
                    replace
                    shallow
                    passHref
                >
                    <a
                        className={clsx(
                            "h-[35px] w-[35px] mx-4",
                            "text-[color:#4f4f4f] hover:border-[color:#4F4F4F] transition-all duration-150",
                            "rounded-[5px] border border-solid border-transparent",
                            "bg-white flex items-center text-center justify-center ",
                            currentPage === pageNumber + 1 && "bg-[#4f4f4f] text-[color:#FFF]"
                        )}
                    >
                        {pageNumber + 1}
                    </a>
                </Link>
            ))}
        </div>
    )
}

export default memo(UIPagesNumbers)
