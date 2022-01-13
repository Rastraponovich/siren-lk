import { createEvent, createStore, forward, sample } from "effector"

import catalogAPI, { IParams } from "./catalogAPI"

import { ICatalogItem } from "@/types/item.types"

const setTags = createEvent<string[]>()
const getOneCatalogItems = createEvent<string>()
const getAllCatalogItems = createEvent<IParams>()

const refreshData = createEvent()

// const prevPage = createEvent()
// const nextPage = createEvent()
const setLastPage = createEvent()

const setPage = createEvent<number>()
const getPaginateItems = createEvent<IParams>()
const setContentPerPage = createEvent<number>()
const getItemLength = createEvent<IParams>()

const $tags = createStore<string[]>([]).on(setTags, (_, tags) => tags)
const $items = createStore<ICatalogItem[]>([]).reset(catalogAPI.getAllCatalogItemsFx.pending)

const $page = createStore<any>(1)
const $totalPages = createStore<number>(1)
const $contentPerPage = createStore<number>(5).on(setContentPerPage, (_, value) => value)
const $itemsLength = createStore<number>(0)

const $item = createStore<ICatalogItem>({} as ICatalogItem).on(
    catalogAPI.getOneCatalogItemFx.doneData,
    (_, item) => item.data
)

const $isLoaderVisibily = createStore(false)
    .on(catalogAPI.getAllCatalogItemsFx.pending, (_, newState) => newState)
    .reset(catalogAPI.getAllCatalogItemsFx.done)
    .reset(catalogAPI.getAllCatalogItemsFx.doneData)

//всегда возвращать количество элементов по заданному условию
sample({
    clock: catalogAPI.getAllCatalogItemsFx.doneData,
    source: $contentPerPage,
    fn: (contentPerPage, response) => response.data.slice(0, contentPerPage),
    target: $items,
})

sample({
    clock: getAllCatalogItems,
    source: $tags,
    fn: (tags, params) => ({ ...params, tags }),
    target: catalogAPI.getAllCatalogItemsFx,
})

forward({
    from: getOneCatalogItems,
    to: catalogAPI.getOneCatalogItemFx,
})

//если меняем количество элементов выполняем запрос
sample({
    clock: setContentPerPage,
    source: $contentPerPage,
    fn: (contentPerPage, _) => ({ limit: contentPerPage }),
    target: getAllCatalogItems,
})

//вызываем переход на следующую страницу
// sample({
//     clock: nextPage,
//     source: [$page, $totalPages],
//     target: setPage,
//     fn: ([currentPage, totalPages], _) =>
//         currentPage === totalPages ? currentPage : currentPage + 1,
// })
//вызываем переход на предидущую страницу
// sample({
//     clock: prevPage,
//     source: $page,
//     target: setPage,
//     fn: (currentPage, _) => (currentPage === 1 ? currentPage : currentPage - 1),
// })

// вызываем переход последнюю страницу
sample({
    clock: setLastPage,
    source: $totalPages,
    target: setPage,
    fn: (totalPages, _) => totalPages,
})
//переход по страницам
sample({
    clock: setPage,
    source: $page,
    target: $page,
    fn: (store, value) => value > store && store,
})

sample({
    clock: setPage,
    source: $page,
    target: $page,
    fn: (_, value) => (value < 1 ? 1 : value),
})

//запрос по пагинации
sample({
    clock: setPage,
    source: $contentPerPage,
    fn: (limit, page) => ({ limit, skip: limit * (page - 1) }),
    target: getPaginateItems,
})

//Устанавливаем кличество элементов
forward({
    from: getItemLength,
    to: catalogAPI.getAllCatalogItemslenghtFx,
})
sample({
    source: catalogAPI.getAllCatalogItemslenghtFx.doneData,
    fn: (items) => items.data.length,
    target: $itemsLength,
})

sample({
    clock: catalogAPI.getAllCatalogItemsFx.doneData,
    source: [$contentPerPage, $itemsLength],
    target: $totalPages,
    fn: ([contentPerPage, itemsLength], _) => Math.ceil(itemsLength / contentPerPage),
})

sample({
    clock: getPaginateItems,
    source: $tags,
    fn: (tags, params) => ({ ...params, tags }),
    target: catalogAPI.getAllCatalogItemsFx,
})

//refreshData
sample({
    clock: refreshData,
    source: [$page, $contentPerPage],
    fn: ([currentPage, contentPerPage], _) => ({
        limit: contentPerPage,
        skip: contentPerPage * currentPage,
    }),
    target: getAllCatalogItems,
})

sample({
    clock: refreshData,
    source: $tags,
    fn: (tags, _) => ({ tags }),
    target: getItemLength,
})
const catalogPagination = {
    $page,
    $totalPages,
    $itemsLength,
    $contentPerPage,
    setPage,

    setLastPage,
    getPaginateItems,
    getItemLength,
    setContentPerPage,
}

export {
    getAllCatalogItems,
    getOneCatalogItems,
    $item,
    setTags,
    $tags,
    $items,
    refreshData,
    $isLoaderVisibily,
    catalogPagination,
}
