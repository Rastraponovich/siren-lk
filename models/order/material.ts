import { createEvent, createStore, forward, sample } from "effector"
type TMaterialDictType = {
    id: number
    value: string
    image?: string
}

const DEFAULT_MATERIAL = { id: 1, value: "Гранит", image: "/assets/image/catalog/granit.jpg" }

const materialsDict: TMaterialDictType[] = [
    { id: 1, value: "Гранит", image: "/assets/image/catalog/granit.jpg" },
    { id: 2, value: "Мрамор", image: "/assets/image/catalog/granit.jpg" },
    { id: 3, value: "Винга", image: "/assets/image/catalog/granit.jpg" },
    { id: 4, value: "Дымовский", image: "/assets/image/catalog/granit.jpg" },
    { id: 5, value: "Кашмир", image: "/assets/image/catalog/granit.jpg" },
]

const $materialsDict = createStore<TMaterialDictType[]>(materialsDict)

const selectMaterial = createEvent<TMaterialDictType>()
const $selectedMaterial = createStore<string>("")
sample({
    source: selectMaterial,
    target: $selectedMaterial,
    fn: (data) => data.value,
})

export { $materialsDict, selectMaterial, $selectedMaterial }
