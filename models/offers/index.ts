import { AxiosResponse } from "axios"
import { createEffect, createEvent, createStore } from "effector"

export const switchIsLoading = createEvent()

export const getOneOfferFx = createEffect<string, AxiosResponse<any>, Error>()
export const setIsLoadingFx = createEffect<void, AxiosResponse<any[]>, Error>()
export const getAllOffersFx = createEffect<void, AxiosResponse<any[]>, Error>()

export const $offers = createStore<any[]>([])
export const $offer = createStore<any>({})
export const $isLoading = createStore(false)
