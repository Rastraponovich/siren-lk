import React, { FC, memo } from "react"
import { signOut, useSession } from "next-auth/client"

import UILoginForm from "@/components/LoginForm/LoginForm"
import { useRouter } from "next/router"
import { useStore, useEvent } from "effector-react/scope"
import {
    $isOpenLoginModal,
    $isOpenRregistrationModal,
    closeLoginModal,
    switchLoginModal,
    switchRregistrationModal,
} from "@/models/loginPanel"

import RegistrationForm from "@/components/RegistrationForm/RegistrationForm"
import dynamic from "next/dynamic"

// import Modal from "../Modal/Modal"
const Modal = dynamic(() => import("../Modal/Modal"), {
    ssr: false,
})

interface LoginModuleProps {}

const LoginModule: FC<LoginModuleProps> = () => {
    const [session] = useSession()
    const { pathname } = useRouter()

    const isOpenLoginModal = useStore($isOpenLoginModal)
    const isOpenRegistrationModal = useStore($isOpenRregistrationModal)
    const handleSwitchRegistrationModal = useEvent(switchRregistrationModal)
    const handleSwitchLoginModal = useEvent(switchLoginModal)
    const handleCloseModal = useEvent(closeLoginModal)
    const handleLogOut = () => {
        const param = /(?:\/lk\/)/g

        if (pathname.match(param)) {
            signOut({ callbackUrl: "/" })
        } else {
            signOut()
        }
    }

    return (
        <div className={"items-start hidden xl:flex xl:flex-col text-base leading-4 "}>
            {!session && (
                <>
                    <span className="hidden sm:block mb-2 sm:text-left sm:w-full lg:text-right">
                        Личный кабинет
                    </span>
                    <div className="flex">
                        <button
                            className="mr-6 last:mr-0 underline border-none outline-none text-[color:#d98a13] cursor-pointer bg-transparent "
                            type="button"
                            onClick={handleSwitchLoginModal}
                        >
                            Вход
                        </button>
                        <button
                            className="mr-6 last:mr-0 underline border-none outline-none text-[color:#d98a13] cursor-pointer bg-transparent "
                            type="button"
                            onClick={handleSwitchRegistrationModal}
                        >
                            Регистрация
                        </button>
                        <Modal isOpen={isOpenLoginModal} closeModal={handleCloseModal}>
                            <UILoginForm />
                        </Modal>

                        <Modal
                            isOpen={isOpenRegistrationModal}
                            closeModal={handleSwitchRegistrationModal}
                        >
                            <RegistrationForm closeModal={handleSwitchRegistrationModal} />
                        </Modal>
                    </div>
                </>
            )}
            {session && (
                <>
                    <span className="hidden sm:block sm:mb-2">
                        Добрый день, {session.user.email}
                    </span>
                    <button
                        className="mr-6 last:mr-0 underline border-none outline-none text-[color:#d98a13] cursor-pointer bg-transparent "
                        onClick={handleLogOut}
                    >
                        Выйти
                    </button>
                </>
            )}
        </div>
    )
}

export default memo(LoginModule)
