import clsx from "clsx"
import { Store } from "effector"
import { useList } from "effector-react"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { FC, memo } from "react"

type TNavLinks = { title: string; path: string }
type TDirectionNavBar = "row" | "column"

interface InputProps {
    navLinks: Store<TNavLinks[]>
    light?: boolean
    direction?: TDirectionNavBar
    className?: string
}

const Navbar: FC<InputProps> = ({ navLinks, light = false, direction = "row", className }) => {
    const { route } = useRouter()

    const checkActive = (route: string, path: string): boolean => {
        return route.includes(path)
    }
    return (
        <nav
            className={clsx(
                "hidden lg:flex relative text-base  lg:text-base lg:leading-[18px] lg:font-normal ",
                light ? "navbar-light items-center lg:font-IBMPlexSans" : "font-Rubik",
                className
            )}
        >
            {useList(navLinks, {
                keys: [navLinks],
                fn: ({ title, path }) => (
                    <Link href={path} key={path}>
                        <a
                            className={clsx(
                                "relative",
                                checkActive(route, path) && "active ",
                                light ? "" : "font-Rubik"
                            )}
                        >
                            {title}
                        </a>
                    </Link>
                ),
            })}
        </nav>
    )
}

export default memo(Navbar)
