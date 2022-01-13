import axios from "axios"
import React, { memo, FC, ChangeEvent } from "react"
import * as Yup from "yup"

import { IRegistration } from "@/types/users.types"
import { useRouter } from "next/router"
import { signIn } from "next-auth/client"

import { UIImageButton, UIFormField, UIButton, UICheckBox } from "@/components/UI"
import { useEvent, useStore } from "effector-react/scope"
import {
    $additionalCheck,
    setCheckBox,
    loginFx,
    registartionForm,
} from "@/models/loginPanel/registrationform"
import { Dialog } from "@headlessui/react"
import clsx from "clsx"
import Image from "next/image"
import { closeLoginModal } from "@/models/loginPanel"
import { useForm } from "effector-forms"
interface IProps {
    closeModal: () => void
}

const validationSchema = Yup.object({
    email: Yup.string().required("Введите email").email("Неверный формат email"),
    password: Yup.string().required("Минимум 3 символа").min(3, "Минимум 3 символа"),
    repassword: Yup.string().test(
        "is-jimmy",
        "Пароли не совпадают",
        (value, context) => value === context.parent.password
    ),
})

const RegistrationForm: FC<IProps> = ({ closeModal }) => {
    const router = useRouter()
    const { fields, values, submit } = useForm(registartionForm)

    const response = useEvent(loginFx.doneData)

    const handleSetCheckBox = useEvent(setCheckBox)
    const additionalCheck = useStore($additionalCheck)
    const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        submit()

        // try {
        //     const request = await axios.post(`/api/registration`, {
        //         email,
        //         password,
        //         repassword,
        //         nameCompany,
        //         fullName,
        //         phone,

        //         role: additionalCheck ? "Executor" : "Client",
        //     })
        //     console.log(request.data)
        //     await signIn("credentials", { redirect: false, email, password })

        //     if (!additionalCheck) {
        //         router.push("/lk/Client")
        //     }
        //     if (additionalCheck) {
        //         router.push("/lk/Executor")
        //     }
        //     closeModal()
        // } catch (error) {
        //     if (error.response) {
        //         console.log(error, error.response)
        //         // formikHelpers.setFieldError("email", error.response.data.messageError)
        //     }
        // }
    }

    return (
        <div className="relative pt-24 flex flex-col w-full px-8 sm:pt-12 pb-8 sm:px-32">
            <h3 className=" font-medium text-2xl sm:text-4xl leading-[44px] text-center text-white mb-4 sm:mb-20 ">
                Регистрация
            </h3>
            <button
                className={clsx(
                    "absolute top-6 right-6 text-xl text-white bg-transparent cursor-pointer",
                    "bg-transparent border-none outline-none"
                )}
                onClick={closeModal}
            >
                <Image src={"/assets/image/cross.svg"} height={24} width={24} alt="close-icon" />
            </button>

            <form className="flex font-Rubik flex-col items-center" onSubmit={onSubmit}>
                <input
                    type="text"
                    value={fields.email.value}
                    // disabled={pending}
                    placeholder="e-mail"
                    onChange={(e) => fields.email.onChange(e.target.value)}
                    className={clsx(
                        " mb-4 w-full p-[14px] text-[15px] border-2 border-solid border-[color:#DDDEE4] bg-white rounded focus:border-[color:#EDA84D] focus:ring-[color:#EDA84D]"
                    )}
                />
                <input
                    type="password"
                    value={fields.password.value}
                    // disabled={pending}
                    placeholder="password"
                    onChange={(e) => fields.password.onChange(e.target.value)}
                    className={clsx(
                        !fields.password.isValid && "ring-red-600",
                        " mb-4 w-full p-[14px] text-[15px] border-2 border-solid border-[color:#DDDEE4] bg-white rounded focus:border-[color:#EDA84D] focus:ring-[color:#EDA84D]"
                    )}
                />
                <input
                    type="password"
                    value={fields.confirm.value}
                    // disabled={pending}
                    placeholder="confirm password"
                    onChange={(e) => fields.confirm.onChange(e.target.value)}
                    className={clsx(
                        " mb-4 w-full p-[14px] text-[15px] border-2 border-solid border-[color:#DDDEE4] bg-white rounded focus:border-[color:#EDA84D] focus:ring-[color:#EDA84D]"
                    )}
                />

                <UICheckBox
                    onChange={handleSetCheckBox}
                    checked={additionalCheck}
                    labelClassName="text-sm text-white font-normal"
                    className="  flex w-full text-[10px] leading-3 text-white justify-center mb-[60px] "
                    caption="Я исполнитель (для юридических лиц)"
                />

                {additionalCheck && (
                    <>
                        <input
                            type="text"
                            value={fields.nameCompany.value}
                            // disabled={pending}
                            placeholder="Название фирмы"
                            onChange={(e) => fields.nameCompany.onChange(e.target.value)}
                            className=" mb-4 w-full p-[14px] text-[15px] border-2 border-solid border-[color:#DDDEE4] bg-white rounded focus:border-[color:#EDA84D] focus:ring-[color:#EDA84D]"
                        />

                        <input
                            type="text"
                            value={fields.fullName.value}
                            // disabled={pending}
                            placeholder="ФИО"
                            onChange={(e) => fields.fullName.onChange(e.target.value)}
                            className=" mb-4 w-full p-[14px] text-[15px] border-2 border-solid border-[color:#DDDEE4] bg-white rounded focus:border-[color:#EDA84D] focus:ring-[color:#EDA84D]"
                        />
                        <input
                            type="text"
                            value={fields.phone.value}
                            // disabled={pending}
                            placeholder="Телефон"
                            onChange={(e) => fields.phone.onChange(e.target.value)}
                            className="mb-4  w-full p-[14px] text-[15px] border-2 border-solid border-[color:#DDDEE4] bg-white rounded focus:border-[color:#EDA84D] focus:ring-[color:#EDA84D]"
                        />
                    </>
                )}

                <button
                    type="submit"
                    className={clsx(
                        "rounded py-4 px-10 text-black capitalize button button--primary"
                    )}
                >
                    Зарегистрироваться
                </button>
            </form>
        </div>
    )
}

export default memo(RegistrationForm)
