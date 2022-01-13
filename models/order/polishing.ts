import { createEvent, createStore, sample } from "effector"
import { ChangeEvent } from "react"
type DictType = {
    id: number
    value: string
}

const DEFAULT_VALUE = "Видимые стороны"
const polishingDict: DictType[] = [
    { id: 1, value: "Видимые стороны" },
    { id: 2, value: "Все стороны" },
]

const $polishingDict = createStore<DictType[]>(polishingDict)

const selectPolishing = createEvent<ChangeEvent<HTMLInputElement>>()

const $selectedPolishing = createStore<string>(DEFAULT_VALUE)

sample({
    source: selectPolishing,
    target: $selectedPolishing,
    fn: (e) => e.target.value,
})

export { $polishingDict, $selectedPolishing, selectPolishing }
