import { createEvent, createStore, guard, sample } from "effector"
import { ChangeEvent } from "react"
type DictType = {
    id: number
    value: string
}
const typeDict: DictType[] = [
    { id: 1, value: "Одинарное" },
    { id: 2, value: "Парное" },
    { id: 3, value: "Тройное" },
]

const DEFAULT_FIELD_VALUE = "Одинарное"

const $typeDict = createStore<DictType[]>(typeDict)

const selectType = createEvent<ChangeEvent<HTMLInputElement>>()
const $selectedType = createStore<string>(DEFAULT_FIELD_VALUE)

const changeCustomField = createEvent<ChangeEvent<HTMLInputElement>>()

const selectCustomField = createEvent<ChangeEvent<HTMLInputElement>>()

const $customField = createStore<string>("").reset(selectType)

const $checkedCustomFiled = createStore<boolean>(false).reset(selectType)

sample({ clock: selectType, target: $selectedType, fn: (e) => e.target.value })
sample({ clock: selectCustomField, target: $checkedCustomFiled, fn: () => true })
sample({ clock: changeCustomField, target: $customField, fn: (e) => e.target.value })
guard({ source: $customField, target: $selectedType, filter: $checkedCustomFiled })

export {
    $typeDict,
    selectType,
    $selectedType,
    changeCustomField,
    selectCustomField,
    $customField,
    $checkedCustomFiled,
}
