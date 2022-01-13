import { IOrder } from "@/types/order.types"
import axios, { AxiosResponse } from "axios"
import { createEffect, createEvent, createStore, forward, guard, sample } from "effector"
import OrdersAPI from "./ordersApi"

export const switchIsLoading = createEvent()

const getAllOrdersByClient = createEvent<string>()

export const getOneOrderFx = createEffect<string, AxiosResponse<any>, Error>()
export const setIsLoadingFx = createEffect<void, AxiosResponse<any[]>, Error>()
export const getAllOrdersFx = createEffect<void, AxiosResponse<any[]>, Error>()

const getOrderById = createEvent<string>()

// const getOrderByIdFx = createEffect<string, AxiosResponse<IOrder>, Error>(
//     async (orderId) => await ordersAPI("/order/getbyid", { id: orderId })
// )

const $orders = createStore<IOrder[]>([])
    .on(OrdersAPI.getAllOrdersByClientFx.doneData, (_, response) => response.data)
    .on(OrdersAPI.getAllOrdersByStatusFx.doneData, (_, response) => response.data)

sample({
    source: getAllOrdersByClient,
    target: OrdersAPI.getAllOrdersByClientFx,
})

sample({
    source: OrdersAPI.getAllOrdersByClientFx.doneData,
    fn: (response) => response.data,
    target: $orders,
})

const $order = createStore<IOrder>({} as IOrder)

const $isLoading = createStore(false)

// sample({
//     source: getOrderById,
//     target: getOrderByIdFx,
// })
// sample({
//     source: getOrderByIdFx.doneData,
//     fn: (response) => response.data,
//     target: $order,
// })

export { $isLoading, $order, $orders, getOrderById, getAllOrdersByClient }
