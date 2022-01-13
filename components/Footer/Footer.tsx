import { FC, memo } from "react"
import Link from "next/link"

import { $navlinks } from "@/models/mocks/navlinks"
import Navbar from "../UI/Navbar/Navbar"
import clsx from "clsx"

const Footer: FC = () => {
    return (
        <footer
            className={clsx(
                "font-IBMPlexSans px-10 py-8 items-start text-white relative  flex bg-[#0b0b0b] flex-col ",
                "sm:grid-cols-3 sm:px-[50px] sm:py-16 sm:grid sm-mb-0",
                "md:footer-md",
                "lg:grid-cols-10 items-center",
                "2xl:grid-cols-12"
            )}
        >
            <div
                className={clsx(
                    "flex flex-col text-sm  font-medium",
                    "sm:col-span-1 sm:leading-[18px]",
                    "lg:col-span-2"
                )}
            >
                <span>&#169; 2021 Сирень.</span>
                <span>Все права защищены</span>
            </div>

            <Navbar
                navLinks={$navlinks}
                className="font-Rubik space-x-4 xl:space-x-9 2xl:col-start-4"
            />

            <div
                className={clsx(
                    "text-sm flex flex-col text-[#F2F2F2]   ",
                    "sm:col-span-1 sm:col-end-4",
                    "lg:col-end-11 lg:col-span-2",
                    "xl:justify-self-end",
                    "2xl:col-end-13"
                )}
            >
                <span className="sm:mb-1.5">Техническая поддержка</span>
                <Link href="mailto:partners@part.exchange">
                    <a className="sm:text-xs sm:leading-[15px]">partners@part.exchange</a>
                </Link>
            </div>
        </footer>
    )
}

export default memo(Footer)
