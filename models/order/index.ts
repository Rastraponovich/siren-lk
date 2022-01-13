import * as StellaSize from "./stella"
import * as StandSize from "./stand"
import * as DeliveryInstall from "./delivery"
import * as TypeModel from "./type"
import * as MaterialModel from "./material"
import * as Polishing from "./polishing"
import * as FlowerGarden from "./flowerGarden"
import * as Persons from "./persons"
import { createEffect, createEvent, sample } from "effector"
import axios, { AxiosResponse } from "axios"

const OrderModel = {
    type: TypeModel,
    material: MaterialModel,
    polishing: Polishing,
    stella: StellaSize,
    stand: StandSize,
    flowerGarden: FlowerGarden,
    delivery: DeliveryInstall,
    intallation: DeliveryInstall,
    persons: Persons,
}

const endpoint = `https://lilac-test.gb-game.ru/api`

const uploadFile = createEvent<any>()
const uploadFileFX = createEffect<any, AxiosResponse, Error>(async (image: string) => {
    const bodyFormData = new FormData()
    bodyFormData.append("imgUrl", image)
    const response = await axios.post(`${endpoint}/addFile`, bodyFormData, {
        headers: { "Content-Type": "multipart/form-data" },
    })
    console.log(response)

    return response.data
})
sample({
    source: uploadFile,
    target: uploadFileFX,
})

uploadFileFX.watch(console.log)
export { OrderModel, uploadFile }
