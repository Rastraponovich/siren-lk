import { IReview } from "@/types/reviews.types"
import { createApi, createEvent, createStore, Event, forward, sample, split } from "effector"
import { TouchEvent } from "react"
import { reviews } from "./mock"

const setElementsOnPage = createEvent<number>()
const setCurrentPage = createEvent<number>()

const $reviews = createStore<IReview[]>(reviews)

const $currentPage = createStore<number>(0)

const $elementsOnPage = createStore<number>(1)
const $sliderPages = createStore<number>(null)

const $activeSliderData = createStore<IReview[]>([])

//перелистование
sample({
    source: [$reviews, $elementsOnPage, $currentPage],
    fn: ([reviews, elementsOnPage, currentPage]) =>
        reviews.slice(currentPage * elementsOnPage, currentPage * elementsOnPage + elementsOnPage),
    target: $activeSliderData,
})

sample({
    clock: setElementsOnPage,
    source: [$reviews, $currentPage],
    fn: ([reviews, currentPage], elementsOnPage) =>
        reviews.slice(currentPage * elementsOnPage, currentPage * elementsOnPage + elementsOnPage),
    target: $activeSliderData,
})

sample({
    source: [$reviews, $elementsOnPage],
    fn: ([reviews, elementsOnPage]) => Math.ceil(reviews.length / elementsOnPage),
    target: $sliderPages,
})

forward({
    from: setCurrentPage,
    to: $currentPage,
})

forward({
    from: setElementsOnPage,
    to: $elementsOnPage,
})

const slider = {
    setCurrentPage,
    setElementsOnPage,
    $currentPage,
    $elementsOnPage,
    $sliderPages,
    $activeSliderData,
}

export { $reviews, slider }
