import { createEvent, createStore, Event, guard, sample, Store } from "effector"

type PaginationFactoryReturn = {
    $pages: Store<number>
    $page: Store<number>
    setPage: Event<number>
    nextPage: Event<void>
    prevPage: Event<void>
    limit: Store<number>
    setLastPage: Event<void>
}

type PaginationFactoryProps = {
    limit: Store<number>
}
interface PaginationFactory {
    (props: PaginationFactoryProps): PaginationFactoryReturn
}

export const createPaginationFactory: PaginationFactory = ({ limit }) => {
    const $pages = createStore<number>(10)

    const setPage = createEvent<number>()

    const $page = createStore<number>(1).on(setPage, (_, page) => page)

    const nextPage = createEvent()

    const allowNextPage = guard({
        clock: nextPage,
        source: [$pages, $page],
        filter: ([pages, currentPage], _) => currentPage < pages,
    })

    sample({
        clock: allowNextPage,
        source: $page,
        fn: (currentPage, _) => ++currentPage,
        target: setPage,
    })

    const prevPage = createEvent()
    const allowPrevPage = guard({
        clock: prevPage,
        source: $page,
        filter: (currentPage, _) => currentPage > 1,
    })
    sample({
        clock: allowPrevPage,
        source: $page,
        fn: (currentPage, _) => --currentPage,
        target: setPage,
    })

    const setLastPage = createEvent()

    sample({
        clock: setLastPage,
        source: $pages,
        fn: (pages, _) => pages,
        target: setPage,
    })

    return { $pages, $page, setPage, nextPage, prevPage, limit, setLastPage }
}
