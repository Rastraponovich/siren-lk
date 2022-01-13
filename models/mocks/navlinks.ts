import { createStore } from "effector"

export type TNavLinks = { title: string; path: string }

const navLinksMock: TNavLinks[] = [
    { title: "Каталог", path: "/catalog" },
    { title: "Исполнители", path: "/executors" },
    { title: "Отзывы", path: "/reviews" },
    { title: "FAQ", path: "#faq" },
]

const $navlinks = createStore<TNavLinks[]>(navLinksMock)

export { $navlinks }
