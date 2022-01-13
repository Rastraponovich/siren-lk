import { createEvent, createStore, forward, sample } from "effector"
import { ChangeEvent } from "react"
type DictType = {
    id: number
    value: string
}
const flowerGardenDict: DictType[] = [
    { id: 1, value: "Да" },
    { id: 2, value: "Нет" },
    { id: 3, value: "Надгробная плита" },
]

const flowerGardenFillingDict: DictType[] = [
    { id: 1, value: "Песок" },
    { id: 2, value: "Искусственный газон" },
    { id: 3, value: "Мраморная крошка" },
]

const DEFAULT_VALUE = {
    FLOWER_GARDEN: flowerGardenDict[0].value || "Да",
    FLOWER_GARDEN_FILLING: flowerGardenFillingDict[0].value || "Песок",
}

const $flowerGardenDict = createStore<DictType[]>(flowerGardenDict)
const $flowerGardenFillingDict = createStore<DictType[]>(flowerGardenFillingDict)

const selectFlowerGarden = createEvent<ChangeEvent<HTMLInputElement>>()
const selectFlowerGardenFilling = createEvent<ChangeEvent<HTMLInputElement>>()

const $flowerGarden = createStore<string>(DEFAULT_VALUE.FLOWER_GARDEN)
const $flowerGardenFilling = createStore<string>(DEFAULT_VALUE.FLOWER_GARDEN_FILLING)

sample({ source: selectFlowerGarden, target: $flowerGarden, fn: (e) => e.target.value })
sample({
    source: selectFlowerGardenFilling,
    target: $flowerGardenFilling,
    fn: (e) => e.target.value,
})

export {
    $flowerGardenDict,
    selectFlowerGarden,
    $flowerGarden,
    $flowerGardenFilling,
    $flowerGardenFillingDict,
    selectFlowerGardenFilling,
}
