import { useEffect, useState } from "react"
import { useThrottle } from "./useThrottle"

export default function useWindowWidth() {
    const isSSR = typeof window === "undefined"

    const [windowWidth, setWindowWidth] = useState(isSSR ? 1920 : window.innerWidth)
    const [hooksElemOnpage, setElementOnPage] = useState<number>(1)

    const throttledSetWindowWidth = useThrottle(setWindowWidth, 500)
    const throttledSetElementsOnPage = useThrottle(setElementOnPage, 500)

    const getElemOnPage = (width: number) => {
        if (width > 1536) return 6
        if (width > 1199.8) return 4
        if (width > 991.8) return 3
        if (width > 767.8) return 2
        return 1
    }

    const changeWindowWidth = () => {
        throttledSetWindowWidth(window.innerWidth)
        throttledSetElementsOnPage(getElemOnPage(window.innerWidth))
    }

    useEffect(() => {
        window.addEventListener("resize", changeWindowWidth)

        return () => {
            window.removeEventListener("resize", changeWindowWidth)
        }
    }, [])

    return [windowWidth, hooksElemOnpage]
}
