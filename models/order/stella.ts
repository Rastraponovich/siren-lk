import { combine, createEvent, createStore, forward } from "effector"
type DictType = {
    id: number
    value: string
}

const heightDict: DictType[] = [
    { id: 1, value: "80" },
    { id: 2, value: "100" },
    { id: 3, value: "120" },
]
const widthDict: DictType[] = [
    { id: 1, value: "40" },
    { id: 2, value: "50" },
    { id: 3, value: "60" },
]

const depthDict: DictType[] = [
    { id: 1, value: "5" },
    { id: 2, value: "8" },
    { id: 3, value: "10" },
]

const DEFAULT_DEPTH = depthDict[0].value || "5"
const DEFAULT_HEIGHT = heightDict[0].value || "80"
const DEFAULT_WIDTH = widthDict[0].value || "40"

const selectDepth = createEvent<string>()
const selectHeight = createEvent<string>()
const selectWidth = createEvent<string>()

const $selectedDepth = createStore<string>(DEFAULT_DEPTH)
const $selectedWidth = createStore<string>(DEFAULT_WIDTH)
const $selectedHeight = createStore<string>(DEFAULT_HEIGHT)

const $stellaSize = combine({
    height: $selectedHeight,
    width: $selectedWidth,
    depth: $selectedDepth,
})

const $stellaDepths = createStore<DictType[]>(depthDict)
const $stellaWidths = createStore<DictType[]>(widthDict)
const $stellaHeights = createStore<DictType[]>(heightDict)

const $stellaSizeDicts = combine({
    depthDict: $stellaDepths,
    widthDict: $stellaWidths,
    heightDict: $stellaHeights,
})

forward({ from: selectDepth, to: $selectedDepth })
forward({ from: selectHeight, to: $selectedHeight })
forward({ from: selectWidth, to: $selectedWidth })

export { $stellaSizeDicts, $stellaSize, selectDepth, selectHeight, selectWidth }
