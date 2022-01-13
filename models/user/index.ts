import { createApi, createEvent, createStore } from "effector"
import { ChangeEvent } from "react"

type UserPanel = {
    name: string
    phone: string
    email: string
}
type UserPanelDisabledFileds = {
    name: boolean
    phone: boolean
    email: boolean
}

const setUser = createEvent()

const $isAuth = createStore<boolean>(false)
const $user = createStore<any>(null)

const $userForUserPanel = createStore<UserPanel>({ email: "", name: "", phone: "" })

const switchDisabledFields = createEvent<string>()

const $disabledFieldsUserPanel = createStore<UserPanelDisabledFileds>({
    email: true,
    name: true,
    phone: true,
}).on(switchDisabledFields, (state, key) => ({ ...state, [key]: !state[key] }))

$userForUserPanel.watch(console.log)
$disabledFieldsUserPanel.watch(console.log)

const userForUserPanelAPI = createApi($userForUserPanel, {
    set: (store, e: ChangeEvent<HTMLInputElement>) => ({
        ...store,
        [e.target.id]: e.target.value,
    }),
})

export {
    $user,
    $isAuth,
    setUser,
    $userForUserPanel,
    userForUserPanelAPI,
    switchDisabledFields,
    $disabledFieldsUserPanel,
}
