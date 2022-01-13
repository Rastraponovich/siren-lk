import { createEffect, createStore, createEvent } from "effector"

const switchSideBar = createEvent()
const $isOpenSidebar = createStore<boolean>(false).on(switchSideBar, (state, _) => !state)

export { switchSideBar, $isOpenSidebar }
