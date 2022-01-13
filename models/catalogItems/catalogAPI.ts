import { ICatalogItem } from "@/types/item.types"
import axios, { AxiosResponse } from "axios"
import { createEffect } from "effector"

export interface IParams {
    tags?: string[]
    limit?: string | number
    skip?: string | number
    id?: string
}

const endpoint = `https://lilac-test.gb-game.ru/api`

const API = async (path: string, params?: IParams) => {
    return await axios.get(`${endpoint}${path}`, { params: params })
}

const getAllCatalogItemsFx = createEffect<IParams, AxiosResponse<ICatalogItem[]>, Error>(
    async (params) => await API("/catalog", params)
)

const getAllCatalogItemslenghtFx = createEffect<IParams, AxiosResponse<ICatalogItem[]>, Error>(
    async (params) => await API("/catalog", params)
)

const getOneCatalogItemFx = createEffect<string, any, Error>(
    async (id) => await API("/catalog/getbyid", { id: id })
)

const catalogAPI = {
    getAllCatalogItemsFx,
    getOneCatalogItemFx,
    getAllCatalogItemslenghtFx,
}

export default catalogAPI
