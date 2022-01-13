import React, { memo, FC } from "react"
import Link from "next/link"
import { RightArrowIcon } from "../icons"
import clsx from "clsx"

interface UIBreadCrumbsStaticProps {
    dict?: any[]
    className?: string
}

const UIBreadCrumbsStatic: FC<UIBreadCrumbsStaticProps> = ({ dict, className }) => {
    return (
        <div className="flex font-Rubik text-xs leading-[18px] font-normal text-[color:#6B707B] mb-12 ">
            {dict.map((item) => (
                <Link key={item.id} href={item.href}>
                    <a
                        className={clsx(
                            " flex justify-between items-center",
                            "last:text-[color:#182026] ml-[14px] first:ml-0 hover:text-[color:var(--orange-color-primary)]"
                        )}
                    >
                        <span className="mr-1 last:mr-0">{item.name}</span> {item?.separator}
                    </a>
                </Link>
            ))}
        </div>
    )
}

export default memo(UIBreadCrumbsStatic)
