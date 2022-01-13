import { UsePaginationReturn } from "@/hooks/interfaces"
import React, { FC, ReactNode } from "react"
import { UICell, UIRow } from ".."

interface InputProps extends Partial<UsePaginationReturn> {
    children?: ReactNode
    pagination: boolean
    collspan?: number
}

const UITableFooter: FC<InputProps> = ({
    pagination,
    totalPages,
    prevPage,
    nextPage,
    page,
    setPage,
    collspan,
}) => {
    return (
        <tfoot>
            <UIRow>
                {pagination && (
                    <UICell colspan={collspan.toString() || "5"}>
                        <div style={{ display: "flex", justifyContent: "end" }}>
                            <button onClick={prevPage} style={{ margin: "0 1rem" }}>
                                &larr;
                            </button>
                            {[...Array(totalPages).keys()].map((el) => (
                                <button
                                    onClick={() => setPage(el + 1)}
                                    key={el}
                                    className={`page ${page === el + 1 ? "active" : ""}`}
                                    style={{ margin: "0 1rem" }}
                                >
                                    {el + 1}
                                </button>
                            ))}

                            <button onClick={nextPage} style={{ margin: "0 1rem" }}>
                                &rarr;
                            </button>
                            <span style={{ margin: "0 1rem" }}>
                                {page} из {totalPages}
                            </span>
                        </div>
                    </UICell>
                )}
            </UIRow>
        </tfoot>
    )
}

export { UITableFooter }
