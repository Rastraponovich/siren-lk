import clsx from "clsx"
import { memo, FC, Component } from "react"
import { useList, useStore } from "effector-react/scope"

import { $filters, $selectedCategory, $selectedFilter } from "@/models/categories"

import { Store } from "effector"
import { TFilterTypes } from "@/models/categories/types"

import Link from "next/link"
import { RightArrowIcon } from "../UI/icons"

interface CatalogSidebarFilterProps {
    title?: string
}

const CatalogSidebarFilter: FC<CatalogSidebarFilterProps> = ({ title }) => {
    const selectedFilter = useStore($selectedFilter)
    const selectedCategory = useStore($selectedCategory)

    return (
        <div className="border-t border-t-myOrange pt-5 mb-[100px]">
            <h4 className="font-medium text-base text-[color:#1c1c1f] w-full mb-5">
                {title || "для кого"}
            </h4>
            <nav className="flex flex-col pl-3 w-full space-y-4">
                {useList($filters, (filter) => (
                    <Link
                        href={`/catalog/${encodeURIComponent(selectedCategory.path)}/${
                            filter.value
                        }?page=1`}
                        passHref
                        // shallow
                        replace
                    >
                        <a
                            className={clsx(
                                "cursor-pointer group font-IBMPlexSans font-medium text-sm text-opacity-50 text-[#1C1C1F]",
                                "transition-colors duration-150 ease-in-out hover:text-opacity-100",
                                selectedFilter?.id === filter.id && "text-opacity-100",
                                "flex justify-between items-center"
                            )}
                        >
                            {filter.title}
                            <RightArrowIcon className="opacity-0 group-hover:opacity-100" />
                        </a>
                    </Link>
                ))}
            </nav>
        </div>
    )
}

export default memo(CatalogSidebarFilter)
