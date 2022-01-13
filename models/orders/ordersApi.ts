import { IOrder } from "@/types/order.types"
import axios, { AxiosResponse } from "axios"
import { createEffect } from "effector"

const endpoint = `https://lilac-test.gb-game.ru/api`
const ordersAPI = async (path: string, params?: any) =>
    await axios.get(`${endpoint}${path}`, { params })

const getAllOrdersByStatusFx = createEffect<string, AxiosResponse<IOrder[]>, Error>(
    async (status) => await ordersAPI("/orders/getbystatus", { params: { status: status } })
)

const getAllOrdersByClientFx = createEffect<string, AxiosResponse<IOrder[]>, Error>(
    async (clientId) => await ordersAPI("/orders/getbyclient", { clientId })
)

const OrdersAPI = { getAllOrdersByStatusFx, getAllOrdersByClientFx }

export default OrdersAPI
