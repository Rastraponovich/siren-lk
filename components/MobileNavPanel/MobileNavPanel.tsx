import { useRouter } from "next/router"

import React, { memo, FC } from "react"
import { signOut, useSession } from "next-auth/client"
import { useEvent, useList, useStore } from "effector-react"

import Link from "next/link"
import Image from "next/image"

import { UIButton, UIButtonGroup, UIDrawer } from "@/components/UI"

import { $isOpenMobileDrawer, setVisibilyDrawer } from "@/models/mobileDrawer"
import { switchLoginModal, switchRregistrationModal } from "@/models/loginPanel"
import clsx from "clsx"
import { $navlinks } from "@/models/mocks/navlinks"
import ContactInformation from "../Header/ContactInformation"

const MobileNavPanel: FC = () => {
    const [session] = useSession()
    const { route, pathname } = useRouter()

    const isOpenMobileNavPanel = useStore($isOpenMobileDrawer)

    const checkActive = (route: string, path: string): boolean => {
        return route.includes(path)
    }

    const handleSwitchPanel = useEvent(setVisibilyDrawer)
    const handleOpenRegistration = useEvent(switchRregistrationModal)
    const handleOpenLogin = useEvent(switchLoginModal)

    const handleLogOut = () => {
        const param = /(?:\/lk\/)/g

        if (pathname.match(param)) {
            signOut({ callbackUrl: "/" })
        } else {
            signOut({ redirect: false })
        }
    }

    return (
        <UIDrawer isOpen={isOpenMobileNavPanel} setIsOpen={handleSwitchPanel}>
            <Link href={"/"}>
                <a className="flex flex-col text-[color:#595959] uppercase text-3xl items-center">
                    <div className="h-16 w-16 lg:h-32 lg:w-32">
                        <Image
                            src="/assets/image/logo.svg"
                            alt="Логотип"
                            width={64}
                            height={64}
                            blurDataURL="/assets/image/logo.svg"
                            placeholder="blur"
                            layout="responsive"
                            className="mb-8"
                        />
                    </div>

                    <h3 className="text-center text-4xl font-bold">Сирень</h3>
                </a>
            </Link>

            {!session ? (
                <UIButtonGroup className="justify-center">
                    <UIButton
                        className="mr-4 uppercase text-[color:var(--orange-color-primary)] border-none bg-transparent underline"
                        onClick={handleOpenLogin}
                    >
                        вход
                    </UIButton>
                    <UIButton
                        className="uppercase text-[color:var(--orange-color-primary)] border-none bg-transparent underline"
                        onClick={handleOpenRegistration}
                    >
                        регистрация
                    </UIButton>
                </UIButtonGroup>
            ) : (
                <div className="font-medium text-base text-black">
                    <span>Добрый день, {session.user.email}</span>

                    <div className="flex justify-between items-center mt-4 uppercase text-[color:var(--orange-color-primary)] border-none bg-transparent underline">
                        <Link href={`/lk/${session.user.role.toLowerCase()}`}>
                            <a className="mr-2">Личный кабинет</a>
                        </Link>
                        <UIButton
                            className="text-[color:var(--orange-color-primary)] border-none bg-transparent"
                            onClick={handleLogOut}
                        >
                            Выход
                        </UIButton>
                    </div>
                </div>
            )}

            {/* <div className="flex-grow"></div> */}

            <nav className="flex flex-col">
                <Link href={`/`}>
                    <a
                        className={clsx(
                            checkActive(route, "/") && "mobile-nav--active",
                            "text-[color:#595959] mb-4 text-2xl relative"
                        )}
                    >
                        Главная
                    </a>
                </Link>
                {useList($navlinks, {
                    keys: [],
                    fn: ({ title, path }) => (
                        <Link href={path} key={path}>
                            <a
                                className={clsx(
                                    checkActive(route, path) && "mobile-nav--active",

                                    "text-[color:#595959] mb-4 text-2xl relative"
                                )}
                            >
                                {title}
                            </a>
                        </Link>
                    ),
                })}
            </nav>
            <div className="flex-grow"></div>

            <ContactInformation className="flex flex-col " />
        </UIDrawer>
    )
}

export default memo(MobileNavPanel)
