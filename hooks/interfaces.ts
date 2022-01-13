interface UsePaginationProps {
    contentPerPage: number
    count: number
}

export interface UsePaginationReturn {
    page: number
    totalPages: number
    setPage: (page: number) => void
    nextPage: () => void
    prevPage: () => void
    firstContentIndex: number
    lastContentIndex: number
}

export type UsePagination = (UsePaginationProps: UsePaginationProps) => UsePaginationReturn
