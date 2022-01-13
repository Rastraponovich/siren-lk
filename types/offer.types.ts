import { IItem } from "./catalog.types"
import { ICatalogItem } from "./item.types"

export interface OfferState {
    offers: any[]

    isLoading: boolean
}

export interface IOffer {
    orderId: string
    executorId: string
    status: string
    description: {
        price: string
    }
    id: string
}
