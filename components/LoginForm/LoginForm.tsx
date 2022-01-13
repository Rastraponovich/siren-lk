import React, { ChangeEvent, FC, memo } from "react"
import { useEvent, useStore, useStoreMap } from "effector-react/scope"

import { switchRregistrationModal, closeLoginModal } from "@/models/loginPanel"

import { UIImageButton } from "@/components/UI"
import { Dialog } from "@headlessui/react"
import {
    handleChange,
    handleValidatePasword,
    handleValidateEmail,
    submitted,
    $pending,
    $form,
    $loginError,
    $eachValid,
    $errors,
} from "@/models/loginPanel/loginForm"
import { Event } from "effector"
import clsx from "clsx"
interface InputProps {
    redirect?: boolean
}

interface FieldProps {
    name: string
    type: string
    label: string
    placeholder?: string
    validateOnBlur?: Event<ChangeEvent<HTMLInputElement>>
    error: { error: boolean; value: string }
}

const Field: FC<FieldProps> = ({ name, type, label, validateOnBlur, error, placeholder }) => {
    const onChange = useEvent(handleChange)
    const value = useStoreMap({
        store: $form,
        keys: [name],
        fn: (values) => values[name] || "",
    })

    const onBlur = useEvent(validateOnBlur)
    return (
        <label className="flex flex-col mb-8">
            <input
                type={type}
                value={value}
                name={name}
                placeholder={placeholder}
                onBlur={onBlur}
                onChange={onChange}
                className={clsx(
                    "p-[14px] text-[15px] border-2 border-solid border-[color:#DDDEE4] bg-white rounded focus:border-[color:#EDA84D] focus:ring-[color:#EDA84D]",

                    error.error && "ring-red-600 focus:ring-red-600 ring-4"
                )}
            />
            <div className="text-red-600">{error.value}</div>
        </label>
    )
}

const LoginForm: FC<InputProps> = () => {
    const pending = useStore($pending)
    const closeModal = useEvent(closeLoginModal)
    const handleOpenRegistration = useEvent(switchRregistrationModal)
    const loginError: any = useStore($loginError)
    const eachValid = useStore($eachValid)
    const errors = useStore($errors)

    const onSubmit = useEvent(submitted)

    return (
        <div className="relative px-8 sm:px-32 pb-[85px] pt-24 flex flex-col w-full">
            <h3 className=" font-medium text-2xl sm:text-4xl leading-[44px] text-center text-white mb-4 sm:mb-20 ">
                Вход
            </h3>
            <UIImageButton
                className="absolute top-6 right-6 text-xl text-white bg-transparent cursor-pointer "
                onClick={closeModal}
                icon="/assets/image/cross.svg"
                size="standard"
            />
            <form onSubmit={onSubmit} className="flex flex-col font-Rubik">
                {loginError.error && <h4 className="text-white">{loginError.error}</h4>}
                <Field
                    name="email"
                    type="text"
                    label="email"
                    placeholder="email"
                    validateOnBlur={handleValidateEmail}
                    error={errors.email}
                />
                <Field
                    name="password"
                    type="password"
                    label="password"
                    placeholder="password"
                    validateOnBlur={handleValidatePasword}
                    error={errors.password}
                />

                <div className="flex w-full justify-between mb-8">
                    <button
                        type="button"
                        onClick={handleOpenRegistration}
                        className="text-white font-light underline uppercase text-sm leading-4"
                    >
                        зарегистроваться
                    </button>
                    <button
                        type="button"
                        className="text-white font-light underline uppercase text-sm leading-4"
                    >
                        Забыли пароль
                    </button>
                </div>
                <button
                    disabled={!eachValid || pending}
                    type="submit"
                    className={clsx(
                        "button button--primary self-center text-black px-10 py-4 capitalize rounded bg-myOrange-primary",
                        !eachValid && "opacity-30 cursor-default hover:bg-myOrange-primary",
                        pending && "animate-spin"
                    )}
                >
                    Войти
                </button>
            </form>
        </div>
    )
}

export default memo(LoginForm)
