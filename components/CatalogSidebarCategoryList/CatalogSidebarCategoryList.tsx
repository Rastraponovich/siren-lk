import Link from "next/link"
import React, { memo, FC } from "react"
import { TRoute } from "@/types/routes.types"
import clsx from "clsx"
import { useList, useStore } from "effector-react"
import { Store } from "effector"
import { $categories, $selectedCategory } from "@/models/categories"

interface InputProps {}

const CatalogSidebarCategoryList: FC<InputProps> = () => {
    const activeSection = useStore($selectedCategory)

    return (
        <nav className="flex flex-col w-full space-y-10 pt-10 mb-20 font-Rubik text-base font-medium  border-t border-t-myOrange ">
            {useList($categories, (category) => (
                <Link
                    href={`/catalog/${category.path}?page=1`}
                    passHref
                    replace
                    // shallow
                >
                    <a
                        className={clsx(
                            `flex  text-[color:#1c1c1f] cursor-pointer 
                            transition-colors duration-150 ease-in-out hover:text-myOrange`,
                            activeSection.id === category.id && "text-myOrange"
                        )}
                    >
                        {category.name}
                    </a>
                </Link>
            ))}
        </nav>
    )
}

export default memo(CatalogSidebarCategoryList)
