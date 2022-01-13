import { ICatalogOrderItem } from "./item.types"

type TOrderItemSize = {}
export type TOrderItem = {
    material: string
    type: string
    stellaSize: TOrderItemSize
    standSize: TOrderItemSize
    polishingType: string
    flowerGarden: string
    flowerGardenFilling: string
    region: string
    place: string
    name: string
    section: string
    date: {
        start: string
        end: string
    }
    nameMonument: string
    photo: string
    installation: string
    delivery: string
    id?: string
    _id?: string
}

export interface IOrder {
    status: string
    userId: string
    executorId: string | null
    order: TOrderItem | ICatalogOrderItem
    _id: string
}
