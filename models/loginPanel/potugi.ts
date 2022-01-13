import { Store, createEvent, createStore, combine, sample, Event } from "effector"
import { useStoreMap } from "effector-react"
import { ChangeEvent } from "react"

type Filed = {
    value: string
    name: string
}
interface CreatedFieldReturn {
    [key: string]: {
        $value: Store<any>
        changeEvent: Event<ChangeEvent<HTMLInputElement>>
        $hasError: Store<boolean>
        validateEvent: Event<any>
        $errorText: Store<string>
    }
}

interface CreateField {
    (name: string): CreatedFieldReturn
}

const createFiled: CreateField = (name: string) => {
    const changeEvent = createEvent<ChangeEvent<HTMLInputElement>>()
    const $hasError = createStore<boolean>(null)
    const $errorText = createStore<string>(null)
    const validateEvent = createEvent()

    const $value = createStore<Filed>({
        name,
        value: "",
    })

    $value.on(changeEvent, (prev, next) => ({ ...prev, value: next.target.value }))

    return {
        [name]: {
            $value,
            changeEvent,
            $hasError,
            validateEvent,
            $errorText,
        },
    }
}

const forms = createStore({
    ...createFiled("name"),
    ...createFiled("password"),
})
console.log(forms)

const createForm = () => {
    const name = "name"
    const password = "password"

    const $forms = createStore({
        ...createFiled(name),
        ...createFiled(password),
    })

    const nameStore = useStoreMap({
        store: $forms,
        keys: [name],
        fn: (values) => values[name].$value,
    })
    const passwordStore = useStoreMap({
        store: $forms,
        keys: [password],
        fn: (values) => values[password].$value,
    })

    const values = combine({
        nameStore,
        passwordStore,
    })

    const submit = createEvent()

    const outputvalues = createStore<any>(null)

    sample({
        clock: submit,
        source: values,
        fn: ({ nameStore, passwordStore }) => ({ email: nameStore, password: passwordStore }),
        target: outputvalues,
    })

    return [values]
}
