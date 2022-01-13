import { Breadcrumb } from "@/components/UI/UIBreadcrumbs/interfaces"
import { createEvent, createStore, sample } from "effector"
import { NextRouter } from "next/router"

const convertBreadcrumbs = (sourcePath: string): Breadcrumb[] => {
    const linkPath = sourcePath.split("/")
    linkPath.shift()

    const pathArray = linkPath.map((path, i) => {
        return {
            breadcrumb: path,
            href: "/" + linkPath.slice(0, i + 1).join("/"),
        }
    })

    return pathArray
}

const $breadcrumbs = createStore<Breadcrumb[]>([])

const setBreadCrumbs = createEvent<string>()

sample({
    source: setBreadCrumbs,
    fn: (sourcePath) => convertBreadcrumbs(sourcePath),
    target: $breadcrumbs,
})

export { setBreadCrumbs, $breadcrumbs }
