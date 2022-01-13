import { createEffect, createEvent, createStore, sample } from "effector"

import { TRoute } from "@/types/routes.types"
import { TFilterTypes } from "./types"

const InitialStateCategories: TRoute[] = [
    {
        id: 0,
        path: "vertikalnie",
        name: "Вертикальные",
        image: "/assets/image/sections/service/vertical.jpg",
    },

    {
        id: 1,
        path: "gorizontalnie",
        name: "Горизонтальные",
        image: "/assets/image/sections/service/horizontal.jpg",
    },
    { id: 2, path: "kresty", name: "Кресты", image: "/assets/image/sections/service/krest.jpg" },
    {
        id: 3,
        path: "decorativnie",
        name: "Декоративные",
        image: "/assets/image/sections/service/decor.jpg",
    },
    {
        id: 4,
        path: "musulmanskie",
        name: "Мусульманские",
        image: "/assets/image/sections/service/muslim.jpg",
    },
]
const InitialStateFilters: TFilterTypes[] = [
    { title: "Мужчине", value: "man", id: 1 },
    { title: "Женщине", value: "woman", id: 2 },
    { title: "Родителям", value: "parents", id: 3 },
    { title: "Маме", value: "mom", id: 4 },
    { title: "Бабушке", value: "grandmom", id: 5 },
    { title: "Жене", value: "wife", id: 6 },
    { title: "Дочери", value: "dother", id: 7 },
    { title: "Сыну", value: "son", id: 8 },
]

const selectCategory = createEvent<string>()
const selectFilter = createEvent<string>()

const resetFilter = createEvent()

const $categories = createStore<TRoute[]>(InitialStateCategories)
const $selectedCategory = createStore<TRoute>({} as TRoute)

const $filters = createStore<TFilterTypes[]>(InitialStateFilters)
const $selectedFilter = createStore<TFilterTypes>({} as TFilterTypes).reset([resetFilter])

sample({
    clock: selectFilter,
    source: $filters,
    target: $selectedFilter,
    fn: (filters, filter) => filters.find((item) => item.value === filter),
})
sample({
    clock: selectCategory,
    source: $categories,
    target: $selectedCategory,
    fn: (categories, category) => categories.find((item) => item.path === category),
})

export {
    selectCategory,
    selectFilter,
    $categories,
    $filters,
    $selectedCategory,
    $selectedFilter,
    resetFilter,
}
