import { HTMLAttributes } from "react"

export interface Breadcrumb {
    breadcrumb: string
    href: string
}

export interface CharacterMap {
    from: string
    to: string
}

export interface IBreadcrumbsProps {
    /** The title for the very first breadcrumb pointing to the root directory. Example: '/' Default: 'HOME' */
    rootLabel?: string | null

    /** Boolean indicator whether the root label should be omitted. Example: true Default: false */
    omitRootLabel?: boolean

    /** Boolean indicator if the labels should be displayed as uppercase. Example: true Default: false */
    labelsToUppercase?: boolean | undefined

    /** Array containing a list of specific characters that should be replaced in the label. This can be useful to convert special characters such as vowels. Example: [{ from: 'ae', to: 'ä' }, { from: '-', to: ' '}] Default: [{ from: '-', to: ' ' }] */
    replaceCharacterList?: Array<CharacterMap> | undefined

    /** A transformation function that allows to customize the label strings. Receives the label string and has to return a string or React Component */
    transformLabel?: ((title: string) => React.ReactNode) | undefined

    /** Array containing all the indexes of the path that should be omitted and not be rendered as labels. If we have a path like '/home/category/1' then you might want to pass '[2]' here, which omits the breadcrumb label '1'. Indexes start with 0. Example: [2] Default: undefined */
    omitIndexList?: Array<number> | undefined

    /** Classes to be used for the outer container. Won't be used if useDefaultStyle is true */
    containerClassName?: string
    listClassName?: HTMLAttributes<HTMLOListElement>["className"]
    inactiveItemClassName?: HTMLAttributes<HTMLLIElement>["className"]
    activeItemClassName?: HTMLAttributes<HTMLLIElement>["className"]
}
export interface IConvertBreadcrumbFunc {
    (
        title: string,
        replaceCharacterList: Array<CharacterMap> | undefined,
        transformLabel?: ((title: string) => React.ReactNode) | undefined
    ): React.ReactNode
}

export interface IGetPathFromUrlFunc {
    (url: string): string
}
