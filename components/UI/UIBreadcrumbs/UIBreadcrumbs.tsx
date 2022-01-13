import React, { FC, HTMLAttributes, ReactNode, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { IBreadcrumbsProps, IConvertBreadcrumbFunc } from "./interfaces"
import { useEvent, useList, useStore } from "effector-react/scope"
import { $breadcrumbs, setBreadCrumbs } from "@/models/breadCrumbs"
import clsx from "clsx"

const dict = {
    catalog: "Каталог",
    vertikalnie: "Вертикальные",
    gorizontalnie: "Горизонтальные",
    decorativnie: "Декоративные",
    musulmanskie: "Мусульманские",
    kresty: "Кресты",
    man: "Мужчине",
    woman: "Женщине",
    parents: "Родителям",
    mom: "маме",
    grandmom: "Бабушке",
    wife: "Жене",
    dother: "Дочери",
    son: "Сыну",
}

const convertBreadcrumb: IConvertBreadcrumbFunc = (
    title,
    replaceCharacterList,
    transformLabel?
) => {
    let transformedTitle = title.split(/[?#]/)[0]

    if (transformLabel) {
        return transformLabel(transformedTitle)
    }

    if (replaceCharacterList) {
        for (let i = 0; i < replaceCharacterList.length; i++) {
            transformedTitle = transformedTitle.replaceAll(
                replaceCharacterList[i].from,
                replaceCharacterList[i].to
            )
        }
    }

    const translateTransformedTittle =
        dict[transformedTitle] !== undefined ? dict[transformedTitle] : transformedTitle
    // decode for utf-8 characters and return ascii.
    return decodeURI(translateTransformedTittle)
}

interface UIBreadcrumbsProps extends IBreadcrumbsProps {
    separator?: string | ReactNode
    className?: HTMLAttributes<HTMLElement>["className"]
}

const UIBreadcrumbs: FC<UIBreadcrumbsProps> = ({
    rootLabel,
    omitRootLabel,
    labelsToUppercase,
    replaceCharacterList,
    className,
    transformLabel,
    omitIndexList,
    containerClassName,
    listClassName,
    inactiveItemClassName,
    separator = "/",
    activeItemClassName,
}) => {
    const router = useRouter()

    const breadcrumbs = useStore($breadcrumbs)
    const setBreadcrumbs = useEvent(setBreadCrumbs)

    useEffect(() => {
        if (router) setBreadcrumbs(router.asPath)
    }, [router])

    return (
        <nav className={className} aria-label="breadcrumbs">
            <ol className={listClassName}>
                {!omitRootLabel && (
                    <li className={inactiveItemClassName}>
                        <Link href="/">
                            <a className={clsx(labelsToUppercase && "uppercase")}>
                                {convertBreadcrumb(
                                    rootLabel || "Главная",
                                    replaceCharacterList,
                                    transformLabel
                                )}
                            </a>
                        </Link>
                        <span className="ml-2">{separator}</span>
                    </li>
                )}
                {useList($breadcrumbs, (breadcrumb, i) => {
                    if (
                        !breadcrumb ||
                        breadcrumb.breadcrumb.length === 0 ||
                        (omitIndexList && omitIndexList.find((value) => value === i))
                    ) {
                        return
                    }
                    return (
                        <li
                            key={breadcrumb.href}
                            className={
                                i === breadcrumbs.length - 1
                                    ? activeItemClassName
                                    : inactiveItemClassName
                            }
                        >
                            <Link href={breadcrumb.href}>
                                <a className={clsx("flex", labelsToUppercase && "uppercase")}>
                                    {convertBreadcrumb(
                                        breadcrumb.breadcrumb,
                                        replaceCharacterList,
                                        transformLabel
                                    )}
                                    {i !== breadcrumbs.length - 1 && (
                                        <span className="ml-2">{separator}</span>
                                    )}
                                </a>
                            </Link>
                        </li>
                    )
                })}
            </ol>
        </nav>
    )
}

export { UIBreadcrumbs }
