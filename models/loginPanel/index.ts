import { createEffect, createStore, createEvent, Event, sample, restore, guard } from "effector"
import { signIn } from "next-auth/client"
import { Rule } from "effector-forms"
import { ChangeEvent } from "react"

type TCredential = {
    email: string
    password: string
}
interface Api<T> {
    setError: Event<T>
    clearError: Event<void>
}

type AuthResponse = {
    error: string
    status: number
    ok: boolean
    url: string
}

const rules = {
    required: (): Rule<string> => ({
        name: "required",
        validator: (value) => Boolean(value),
    }),
    email: (): Rule<string> => ({
        name: "email",
        validator: (value) => /\S+@\S+\.\S+/.test(value),
    }),
    minLength: (min: number): Rule<string> => ({
        name: "minLength",
        validator: (value) => value.length >= min,
    }),
    maxLength: (max: number): Rule<string> => ({
        name: "maxLength",
        validator: (value) => value.length <= max,
    }),
}

const validateEmail = (value: string): boolean => /\S+@\S+\.\S+/.test(value)

const loginFx = createEffect<TCredential | any, AuthResponse, Error>(
    async ({ email, password }) => {
        const result = await signIn("credentials", {
            redirect: false,
            email: email,
            password: password,
        })
        return result
    }
)

const switchLoginModal = createEvent()
const closeLoginModal = createEvent()
const openLoginModal = createEvent()
const switchRregistrationModal = createEvent()
const setField = createEvent<{ [key: string]: string | number }>()
const submitted = createEvent()

const $isOpenLoginModal = createStore<boolean>(false).on(switchLoginModal, (prev, _) => !prev)

const $isOpenRregistrationModal = createStore<boolean>(false).on(
    switchRregistrationModal,
    (prev, _) => !prev
)

guard({
    clock: closeLoginModal /* 1 */,
    filter: (state) => (state === true ? false : true) /* 2 */,
    source: $isOpenRregistrationModal /* 3 */,
    target: switchLoginModal /* 4 */,
})

const $form = createStore({
    email: "",
    password: "",
})

sample({
    clock: setField,
    source: $form,
    fn: (form, { key, value }) => ({ ...form, [key]: value }),
    target: $form,
})

const onValidatePassword = createEvent()
const $isValidPassword = createStore<boolean>(false)
sample({
    clock: onValidatePassword,
    source: $form,
    fn: (form, _) => form.password.length > 0,
    target: $isValidPassword,
})

const onValidateEmail = createEvent()
const $isValidEmail = createStore<boolean>(false)

sample({
    clock: onValidateEmail,
    source: $form,
    fn: (form, _) => validateEmail(form.email),
    target: $isValidEmail,
})

const handleChange = setField.prepend((e: ChangeEvent<HTMLInputElement>) => ({
    key: e.target.name,
    value: e.target.value,
}))

//отправка запроса
sample({
    clock: submitted,
    source: $form,
    target: loginFx,
})

//проброс ответа в ошибку
sample({
    source: loginFx.doneData,
    fn: (value) => value.error,
})

//отчистка ошибок
//отмена отправки
submitted.watch((e: any) => {
    e.preventDefault()
})

export {
    switchLoginModal,
    $isOpenLoginModal,
    $isOpenRregistrationModal,
    switchRregistrationModal,
    loginFx,
    closeLoginModal,
    openLoginModal,
    setField,
    submitted,
    $form,
    handleChange,
    onValidatePassword,
    onValidateEmail,
    $isValidPassword,
    $isValidEmail,
}
