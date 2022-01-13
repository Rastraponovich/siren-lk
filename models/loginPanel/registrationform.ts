import { createEffect, createEvent, createStore, forward, sample } from "effector"
import { createForm, Rule } from "effector-forms"
import { ChangeEvent } from "react"
import { $isOpenRregistrationModal, switchRregistrationModal } from "."

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
    equalPassword: (): Rule<string> => ({
        name: "passwords-equal",
        validator: (value: string, { password }) => {
            return value === password
        },
    }),
    requiredIf: (): Rule<string> => ({
        source: $additionalCheck,
        name: "required_if",
        validator: (value, form, additionalCheck) => {
            console.log(additionalCheck, "additionalCheck")

            if (!$additionalCheck) return true
            return Boolean(value)
        },
    }),
}

const loginFx = createEffect<any, any, Error>(async () => "sadad")
const $additionalCheck = createStore<boolean>(false).reset(switchRregistrationModal)
$additionalCheck.watch(console.log)
const registartionForm = createForm({
    fields: {
        email: {
            init: "", // field's store initial value
            rules: [rules.email(), rules.required()],
            validateOn: ["submit"],
        },
        password: {
            init: "", // field's store initial value
            rules: [rules.required()],
        },

        confirm: {
            init: "",
            rules: [rules.required(), rules.equalPassword()],
            validateOn: ["change"],
        },

        additionalCheck: {
            init: "",
            rules: [],
        },
        nameCompany: {
            init: "",
            rules: [rules.requiredIf()],
        },

        fullName: {
            init: "",
            rules: [],
        },
        phone: {
            init: "",
            rules: [],
        },
    },
    validateOn: ["submit"],
})

forward({
    from: registartionForm.formValidated,
    to: loginFx,
})

loginFx.doneData.watch(console.log)

const changeEmail = createEvent<ChangeEvent<HTMLInputElement>>()
const changePassword = createEvent<ChangeEvent<HTMLInputElement>>()
const changeRePassword = createEvent<ChangeEvent<HTMLInputElement>>()

const setCheckBox = createEvent<ChangeEvent<HTMLInputElement>>()

const changeNameCompany = createEvent<ChangeEvent<HTMLInputElement>>()
const changePhone = createEvent<ChangeEvent<HTMLInputElement>>()
const changeFullName = createEvent<ChangeEvent<HTMLInputElement>>()

const $email = createStore<string>("").reset(switchRregistrationModal)
const $password = createStore<string>("").reset(switchRregistrationModal)
const $repassword = createStore<string>("").reset(switchRregistrationModal)

const $nameCompany = createStore<string>("").reset(switchRregistrationModal)
const $fullName = createStore<string>("").reset(switchRregistrationModal)
const $phone = createStore<string>("").reset(switchRregistrationModal)

sample({
    source: changeEmail,
    fn: (e) => e.target.value,
    target: $email,
})

sample({
    source: changeFullName,
    fn: (e) => e.target.value,
    target: $fullName,
})
sample({
    source: changeNameCompany,
    fn: (e) => e.target.value,
    target: $nameCompany,
})
sample({
    source: changePassword,
    fn: (e) => e.target.value,
    target: $password,
})
sample({
    source: changeRePassword,
    fn: (e) => e.target.value,
    target: $repassword,
})
sample({
    source: changePhone,
    fn: (e) => e.target.value,
    target: $phone,
})

sample({
    source: setCheckBox,
    fn: (e) => e.target.checked,
    target: $additionalCheck,
})

export {
    changeEmail,
    changePassword,
    changeRePassword,
    setCheckBox,
    changeNameCompany,
    changePhone,
    changeFullName,
    $email,
    $password,
    $repassword,
    $additionalCheck,
    $nameCompany,
    $fullName,
    $phone,
    registartionForm,
    loginFx,
}
