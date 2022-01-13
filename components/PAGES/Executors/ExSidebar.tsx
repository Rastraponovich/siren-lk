import { UIAccordion } from "@/components/UI"
import { RightArrowIcon } from "@/components/UI/icons"
import { $categories, $filters, $selectedFilter } from "@/models/categories"
import clsx from "clsx"
import { useList, useStore } from "effector-react"
import Link from "next/link"
import React, { memo, FC } from "react"

interface ExSidebarProps {}

const ExSidebar: FC<ExSidebarProps> = () => {
    const selectedFilter = useStore($selectedFilter)
    return (
        <aside className="h-full w-[350px] bg-white static pt-[66px] text-base font-Rubik text-[color:#1C1C1F] font-medium leading-[18px]">
            <div className="pl-[80px] pr-[55px] ">
                <h2 className="uppercase mb-5">памятники</h2>
                <nav className="flex flex-col space-y-10 pt-10 border-t-myOrange-primary border-t mb-20">
                    {useList($categories, (category) => (
                        <Link passHref replace href={`/catalog/${category.path}?page=1`}>
                            <a
                                className={clsx(
                                    "text-[color:#1c1c1f] cursor-pointer ",
                                    "transition-colors duration-150 ease-in-out hover:text-myOrange"
                                )}
                            >
                                {category.name}
                            </a>
                        </Link>
                    ))}
                </nav>
                <h3 className="uppercase mb-5">Прочие категории</h3>
                <div className="flex flex-col mb-[100px] pt-5 border-t-myOrange-primary border-t">
                    <h3 className="mb-4">Для кого</h3>
                    <nav className="flex flex-col space-y-4 font-IBMPlexSans text-sm leading-[14px]  ml-3">
                        {useList($filters, (filter) => (
                            <Link
                                href={`/catalog/verticalnie/${filter.value}?page=1`}
                                passHref
                                replace
                            >
                                <a
                                    className={clsx(
                                        "cursor-pointer group text-[color:#1C1C1F] text-opacity-50",
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
                <UIAccordion
                    title="Элементы оформления"
                    className="mb-8"
                    // sr={true}
                ></UIAccordion>
                <UIAccordion
                    title="По форме"
                    className="mb-8"
                    // sr={true}
                ></UIAccordion>
                <UIAccordion
                    title="Принадлежность к религии"
                    className="mb-8"
                    // sr={true}
                ></UIAccordion>
                <UIAccordion
                    title="Памятник по цвету"
                    className="mb-8"
                    // sr={true}
                ></UIAccordion>
            </div>
        </aside>
    )
}

export default memo(ExSidebar)
