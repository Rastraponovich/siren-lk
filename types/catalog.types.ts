import { ICatalogItem } from "./item.types"

export interface CatalogState {
    items: IItem[]
    selectedCatalogItem: ICatalogItem
    page: any
    isLoading: boolean
}

type TSize = {
    height: number
    width: number
    depth: number
}

interface TStellaSize extends TSize {}
interface TStandSize extends TSize {}

export interface IItem extends ICatalogItem {
    stellaSize: TStellaSize
    standSize: TStandSize
    date: { start: string; end: string }
    _id: string
    nameMonument: string
    section: string
    type: string
    material: string
    polishingType: string
    flowerGarden: string
    flowerGardenFilling: string
    name: string
    photo: string
    installation: string
    delivery: string
    place: string
    __v: number
}
