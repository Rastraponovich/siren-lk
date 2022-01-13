import {
    IConvertBreadcrumbFunc,
    IGetPathFromUrlFunc,
} from "@/components/UI/UIBreadcrumbs/interfaces"
import { useCallback, useMemo, useState } from "react"

const getPathFromUrl: IGetPathFromUrlFunc = (url) => {
    return url.split(/[?#]/)[0]
}

export const useBreadcrumbs: IConvertBreadcrumbFunc = (
    title,
    replaceCharacterList,
    transformLabel?
) => {
    const [transformedTitle, setTransformedTitle] = useState(getPathFromUrl(title))

    const dict = useMemo(
        () => ({
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
        }),
        []
    )

    if (transformLabel) {
        return transformLabel(transformedTitle)
    }

    if (replaceCharacterList) {
        for (let i = 0; i < replaceCharacterList.length; i++) {
            setTransformedTitle(
                transformedTitle.replaceAll(
                    replaceCharacterList[i].from,
                    replaceCharacterList[i].to
                )
            )
        }
    }

    const translateTransformedTittle =
        dict[transformedTitle] !== undefined ? dict[transformedTitle] : transformedTitle
    // decode for utf-8 characters and return ascii.
    return decodeURI(translateTransformedTittle)
}
