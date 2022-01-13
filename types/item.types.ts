import { IBusinessUser, IClientUser } from "./users.types"

export interface ICatalogItem {
    _id: string
    imgUrl: string
    tags: string[]
    monumentName: string
}
export interface ICatalogOrderItem {
    _id: string
    material: string //материал памятника
    type: string // тип захоронения
    imgUrl?: string
    stellaSize: {
        //размер памятника
        width: number
        depth: number
        height: number
    }
    standSize: {
        //размер подставки
        width: number
        depth: number
        height: number
    }
    polishingType: string //тип полировки
    flowerGarden: string //цветник
    flowerGardenFilling: string //наполнение цветника
    region: string //регион кладжбища
    place: string //адрес кладбища
    name: string // гравировка имени
    section: string // тип памятника
    date: { start: string; end: string } | null //годы жизни
    nameMonument: string //название памятника
    photo: null | string //фото
    installation: string //установка
    delivery: string //доставка
}

export interface IOrderItem {
    _id?: string
    order: ICatalogOrderItem
    status: string //статус заявки
    executorId: string | IBusinessUser | null //id исполнителя
    userId: string | null | IClientUser
}

export interface IOrderItemFullUser {
    _id: string
    order: ICatalogOrderItem
    status: string //статус заявки
    executorId: IBusinessUser //id исполнителя
    userId: IClientUser
}

export interface IOffer {
    orderId: string
    executorId: IBusinessUser
    status: string
    price: string
}
