import { createEffect, createStore, createEvent, sample } from "effector"

const setVisibilyDrawer = createEvent()

const $isOpenMobileDrawer = createStore(false).on(setVisibilyDrawer, (prev, state) => !prev)

export { $isOpenMobileDrawer, setVisibilyDrawer }
