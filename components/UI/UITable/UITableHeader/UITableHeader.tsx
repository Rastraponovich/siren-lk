import clsx from "clsx"
import React, { FC } from "react"
import { UIRow } from ".."
import { TTableHead } from "../types"
import { UICell } from "../UICell/UICell"

interface InputProps {
    headers: TTableHead[]
    headerClassName?: string
    celsClassName?: string
}

const UITableHeader: FC<InputProps> = ({ headers, headerClassName, celsClassName }) => {
    return (
        <thead>
            <UIRow className={clsx(headerClassName, "bg-[color:#F5F5F5]")}>
                {headers.map((item) => (
                    <UICell
                        key={item.anchor}
                        className={clsx(
                            celsClassName,
                            "text-sm leading-[17px] text-center text-black text-opacity-60 py-1 px-6",
                            "first:w-3"
                        )}
                        component="th"
                        sorting={item.sorting}
                        onSort={() => item.onSort(item.anchor)}
                    >
                        {item.title}
                    </UICell>
                ))}
            </UIRow>
        </thead>
    )
}

export { UITableHeader }
