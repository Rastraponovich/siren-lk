import React, { FC, useState } from "react"
import RegistrationForm from "@/components/RegistrationForm/RegistrationForm"

import { UIButton } from "../UI"
import LoginForm from "../LoginForm/LoginForm"

interface AuthProps {
    closeModal: () => void
}

export const Auth: FC<AuthProps> = ({ closeModal }) => {
    const [modalType, setModalType] = useState("auth")
    if (modalType === "login") return <LoginForm closeModal={closeModal} />
    if (modalType === "registration") return <RegistrationForm closeModal={closeModal} />
    return (
        <div className="relative py-[70px] flex flex-col justify-center items-center text-white">
            <button
                className="icon-cross absolute top-6 right-6 text-xl  bg-transparent cursor-pointer"
                onClick={closeModal}
            ></button>
            <h3 className="text-base leading-5 text-center mb-[50px]">
                Для отправки заявки исполнителям необходимо войти в систему
            </h3>
            <UIButton onClick={() => setModalType("login")} className="w-[250px] mb-4 last:mb-0">
                Войти в личный кабинет
            </UIButton>
            <UIButton
                onClick={() => setModalType("registration")}
                className="w-[250px] mb-4 last:mb-0"
            >
                Зарегистрироваться
            </UIButton>
        </div>
    )
}
