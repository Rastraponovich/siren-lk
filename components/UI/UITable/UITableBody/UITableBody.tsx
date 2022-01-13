import React, { FC, useMemo } from "react"
import { UICell } from "../UICell/UICell"
import { UIRow } from "../UIRow/UIRow"
import { UITableCheckbox } from "./UITableCheckbox"
import Link from "next/link"
import { TTableHead } from "../types"
import clsx from "clsx"

interface InputProps {
    rows: any[]
    anchors: TTableHead[]
    onClick?(e: any): any
    checked?: any[]
    bodyClassName?: string
    rowsClassName?: string
    cellsClassName?: string
}

const UITableBody: FC<InputProps> = ({
    rowsClassName,
    bodyClassName,
    cellsClassName,
    rows,
    anchors,
    onClick,
    checked,
}) => {
    return (
        <tbody className={bodyClassName}>
            {rows.map((item) => (
                <UIRow key={item.num} className={clsx(rowsClassName, "even:bg-[#F5F5F5]")}>
                    {anchors.map((header) => {
                        if (header.type === "checkbox")
                            return (
                                <UICell key={header.anchor} className={clsx(cellsClassName)}>
                                    <UITableCheckbox
                                        checked={
                                            checked.find((i) => i.num === item.num) ? true : false
                                        }
                                        onChange={() => onClick(item)}
                                    />
                                </UICell>
                            )
                        if (!header.type) {
                            return (
                                <UICell key={header.anchor} className={cellsClassName}>
                                    {item[header.anchor]}
                                </UICell>
                            )
                        }
                        if (header.type === "link") {
                            return (
                                <UICell key={header.anchor} className={cellsClassName}>
                                    <Link href={`${header.href}/${item.order._id}`}>
                                        <a>{header.title}</a>
                                    </Link>
                                </UICell>
                            )
                        }
                    })}
                </UIRow>
            ))}
        </tbody>
    )
}

export { UITableBody }
