import { createEffect, createEvent, createStore, guard, restore, sample } from "effector"
import { signIn } from "next-auth/client"
import { ChangeEvent } from "react"

type TCredential = {
    email: string
    password: string
}

type AuthResponse = {
    error: string
    status: number
    ok: boolean
    url: string
}

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
const $loginError = restore<AuthResponse>(loginFx.doneData, { error: null } as AuthResponse)

const $pending = createStore<boolean>(null).on(loginFx.pending, (_, value) => value)

const setField = createEvent<{ [key: string]: string | number }>()

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

const handleChange = setField.prepend((e: ChangeEvent<HTMLInputElement>) => ({
    key: e.target.name,
    value: e.target.value,
}))

const validateEmail = createEvent()
const validatePassword = createEvent()

const handleValidatePasword = validatePassword.prepend(
    (e: ChangeEvent<HTMLInputElement>) => e.target.value.length > 0
)
const handleValidateEmail = validateEmail.prepend((e: ChangeEvent<HTMLInputElement>) =>
    /\S+@\S+\.\S+/.test(e.target.value)
)

const $isValidEmail = createStore<boolean>(null).on(validateEmail, (_, value) => value)

const $isValidPassword = createStore<boolean>(null).on(validatePassword, (_, value) => value)

const $errors = createStore<any>({
    email: {
        error: false,
        value: "",
    },
    password: {
        error: false,
        value: "",
    },
})
    .on($isValidEmail, (store, newValue) => ({
        ...store,
        email: { error: !newValue, value: !newValue ? "неверная почта" : "" },
    }))
    .on($isValidPassword, (store, newValue) => ({
        ...store,
        password: { error: !newValue, value: !newValue ? "пароль не может быть пустым" : "" },
    }))

const $eachValid = createStore<boolean>(false)

sample({
    source: [$isValidEmail, $isValidPassword],
    fn: ([validEmail, validPassword]) => validEmail && validPassword,
    target: $eachValid,
})

const submitted = createEvent()
const sendSubmited = createEvent()

submitted.watch((e: any) => {
    e.preventDefault()
})

guard({
    clock: submitted,
    source: [$isValidPassword, $isValidEmail],
    filter: ([isvalidpass, isvalidemail]) => isvalidemail && isvalidpass,
    target: sendSubmited,
})

sample({
    clock: sendSubmited,
    source: $form,
    target: loginFx,
})

export {
    $isValidEmail,
    $isValidPassword,
    $form,
    $pending,
    handleChange,
    handleValidateEmail,
    handleValidatePasword,
    submitted,
    $eachValid,
    $errors,
    $loginError,
}
