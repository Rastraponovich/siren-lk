export type TTableHeadType = "field" | "checkbox" | "link"

export type TSortBy = "desc" | "esc"

export interface IOnsort {
    (anchor: string): string | void
}
export type TTableHead = {
    title: string
    anchor: string
    sortBy?: TSortBy
    sorting?: boolean
    onSort?: IOnsort
    type?: TTableHeadType
    href?: string
    linkTitle?: string
    value?: string
}
