import React, { FC, memo, ReactNode, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"

import UserPanel from "@/components/UserPanel/UserPanel"
import { UIImageButton } from "@/components/UI"

import ContactInformation from "./ContactInformation"
import { useEvent, useStore } from "effector-react/scope"
import { setVisibilyDrawer } from "@/models/mobileDrawer"
import clsx from "clsx"
import { $navlinks } from "@/models/mocks/navlinks"
import Navbar from "../UI/Navbar/Navbar"

const Header: FC = () => {
    const handleSwitchMobilePanel = useEvent(setVisibilyDrawer)

    return (
        <header
            className={clsx(
                "grid grid-cols-12 gap-2 w-full font-Rubik text-[color:#595959] font-normal bg-white py-6 px-6  ",
                "sm:px-[50px] sm:py-6 sm:gap-0 sm:grid-cols-10",
                "md:px-[50px] md:py-6 md:gap-0 md:grid-cols-10",
                "lg:grid-cols-12 ",
                "xl:px-20",
                "2xl:drop-shadow-3xl"
            )}
        >
            <Link href={"/"}>
                <a
                    className={clsx(
                        "flex items-center text-base  leading-5 uppercase relative  font-bold",
                        "logo col-span-7",
                        "xl:col-span-2 ",
                        "sm:col-span-3 sm:text-xl sm:leading-[18px] sm:font-medium",
                        "md:col-span-3 md:text-xl md:leading-[18px] md:font-medium",
                        "lg:col-span-2",
                        ""
                    )}
                >
                    <Image
                        src="/assets/image/logo.svg"
                        alt="Логотип"
                        width={46}
                        height={46}
                        objectFit="cover"
                        layout="fixed"
                    />
                    <h2 className="ml-3 ">Сирень</h2>
                </a>
            </Link>
            <Navbar
                navLinks={$navlinks}
                light
                className="col-span-5 lg:col-start-4 xl:col-start-3 lg:space-x-10 2xl:col-start-4 2xl:col-span-4"
            />
            <ContactInformation
                className={clsx(
                    "hidden  flex-col items-end justify-center col-span-2  ",
                    "xl:col-start-8 xl:justify-self-start xl:flex",
                    "2xl:col-end-10 col-span-1 2xl:justify-self-end",
                    "cs1920:col-start-9 cs1920:col-span-1"
                )}
            />
            <div
                className={clsx(
                    // mr-8
                    "flex justify-center items-center col-span-1 col-start-9",
                    "sm:col-start-9 sm:col-span-1 ",
                    "md:col-start-9 md:col-span-1 ",

                    "lg:hidden lg:mr-0"
                )}
            >
                <UIImageButton
                    onClick={handleSwitchMobilePanel}
                    icon={"/assets/image/icon_menu.svg"}
                    height={32}
                    width={32}
                    className="cursor-pointer lg:hidden flex items-center"
                    alt="меню"
                    layout="fixed"
                />
            </div>
            <UserPanel
                className={clsx(
                    "col-span-2 col-start-11 col-end-13",

                    "sm:col-span-1 sm:col-end-11",
                    "md:col-span-1 md:col-end-11",
                    "lg:col-span-1 lg:col-end-13",
                    "xl:col-span-3 xl:col-end-13 justify-self-end",
                    "2xl:col-end-13",
                    "cs1920:col-end-13 cs1920:col-span-2"
                )}
            />
        </header>
    )
}

export default memo(Header)
