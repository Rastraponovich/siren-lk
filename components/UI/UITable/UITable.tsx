import usePagination from "@/hooks/usePagination"
import clsx from "clsx"
import React, { FC, useMemo, useState, useCallback } from "react"
import { UITableBody, UITableHeader } from "."
import { TTableHead } from "./types"
import { UITableFooter } from "./UITableFooter/UITableFooter"

interface InputProps {
    headers?: TTableHead[]
    data: any[]
    title?: string
    className?: string
    titleClassName?: string
    cellsClassName?: string
    pagination?: boolean
    onLoad?(): void
    loading?: boolean
}

const UITable: FC<InputProps> = ({
    data,
    headers,
    className,
    title,
    titleClassName,
    cellsClassName,
    pagination,
    onLoad,
    loading,
}) => {
    const [checked, setChecked] = useState<any[]>([])
    const [counterPages] = useState<number>(5)

    const { firstContentIndex, lastContentIndex, setPage, page, nextPage, prevPage, totalPages } =
        usePagination({ contentPerPage: counterPages, count: data.length })

    const memoData = useMemo(
        () => data.slice(firstContentIndex, lastContentIndex),
        [firstContentIndex, lastContentIndex, data]
    )

    const handleNextPage = useCallback(() => {
        onLoad()
        nextPage()
    }, [onLoad, nextPage])

    const handlePrevPage = useCallback(() => {
        onLoad()
        prevPage()
    }, [onLoad, prevPage])

    const handleSetPage = useCallback(
        (page: number) => {
            onLoad()
            setPage(page)
        },
        [onLoad, setPage]
    )

    const handleCheckBoxClick = useCallback(
        (item: any) => {
            const result = checked.find((val) => val.num === item.num)

            if (result) {
                const newArray = checked.filter((val) => val.num !== item.num)
                setChecked(newArray)
            } else {
                setChecked([...checked, item])
            }
        },
        [checked]
    )

    return (
        <>
            <h3
                className={clsx(
                    titleClassName,
                    "font-RobotoMono text-[18px] leading-[44px] text-black mb-3"
                )}
            >
                {title}
            </h3>
            <table
                className={clsx(
                    className,
                    "p-4 box-border relative w-full rounded-md border border-solid border-[color:#C5C5C5]"
                )}
            >
                <UITableHeader headers={headers} />
                {loading && (
                    <div className="absolute bg-black bg-opacity-50 h-[85%] left-[-1px] w-full rounded"></div>
                )}
                <UITableBody
                    anchors={headers}
                    rows={memoData}
                    onClick={handleCheckBoxClick}
                    checked={checked}
                    cellsClassName={cellsClassName}
                />
                {totalPages > 0 && (
                    <UITableFooter
                        pagination={pagination}
                        totalPages={totalPages}
                        prevPage={handlePrevPage}
                        nextPage={handleNextPage}
                        page={page}
                        collspan={headers.length}
                        setPage={handleSetPage}
                    ></UITableFooter>
                )}
            </table>
        </>
    )
}

export { UITable }
