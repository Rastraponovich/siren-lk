import { combine, createEvent, createStore, sample } from "effector"
import { ChangeEvent } from "react"
type DictType = {
    id: number
    value: string
}
const installDict: DictType[] = [
    { id: 1, value: "Одинарное" },
    { id: 2, value: "Парное" },
    { id: 3, value: "Тройное" },
]

const deliveryDict: DictType[] = [
    { id: 1, value: "Самостоятельно" },
    { id: 2, value: "Силами исполнителя" },
]

const DEFALUT_VALUES = {
    DELIVERY: deliveryDict[0].value || "Самостоятельно",
    INSTALL: installDict[0].value || "Одинарное",
}

const $installDict = createStore<DictType[]>(installDict)
const $deliveryDict = createStore<DictType[]>(deliveryDict)

const $installationType = createStore<string>(DEFALUT_VALUES.INSTALL)
const $deliveryType = createStore<string>(DEFALUT_VALUES.DELIVERY)

const selectInstallationType = createEvent<ChangeEvent<HTMLInputElement>>()
const selectDeliveryType = createEvent<ChangeEvent<HTMLInputElement>>()

const $installationDicts = combine({
    installDict: $installDict,
    deliveryDict: $deliveryDict,
})

sample({
    source: selectInstallationType,
    target: $installationType,
    fn: (e) => e.target.value,
})
sample({
    source: selectDeliveryType,
    target: $deliveryType,
    fn: (e) => e.target.value,
})

export {
    $installationDicts,
    selectInstallationType,
    selectDeliveryType,
    $installationType,
    $deliveryType,
    $installDict,
    $deliveryDict,
}
