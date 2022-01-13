import { combine, createEvent, createStore, forward } from "effector"
type DictType = {
    id: number
    value: string
}

const heightDict: DictType[] = [
    { id: 1, value: "80" },
    { id: 2, value: "100" },
    { id: 3, value: "110" },
    { id: 4, value: "120" },
    { id: 5, value: "130" },
]
const widthDict: DictType[] = [
    { id: 1, value: "50" },
    { id: 2, value: "60" },
    { id: 3, value: "70" },
    { id: 4, value: "80" },
    { id: 5, value: "90" },
]

const depthDict: DictType[] = [
    { id: 1, value: "5" },
    { id: 2, value: "8" },
]

const DEFAULT_SIZES = {
    DEFAULT_DEPTH: depthDict[0].value || "5",
    DEFAULT_HEIGHT: heightDict[0].value || "80",
    DEFAULT_WIDTH: widthDict[0].value || "50",
}

const $standDepths = createStore<DictType[]>(depthDict)
const $standWidths = createStore<DictType[]>(widthDict)
const $standHeights = createStore<DictType[]>(heightDict)

const selectWidth = createEvent<string>()
const selectHeight = createEvent<string>()
const selectDepth = createEvent<string>()

const $selectedWidth = createStore<string>(DEFAULT_SIZES.DEFAULT_WIDTH)
const $selectedDepth = createStore<string>(DEFAULT_SIZES.DEFAULT_DEPTH)
const $selectedHeight = createStore<string>(DEFAULT_SIZES.DEFAULT_HEIGHT)

const $standSize = combine({
    height: $selectedHeight,
    width: $selectedWidth,
    depth: $selectedDepth,
})

const $standSizes = combine({
    heightDict: $standHeights,
    widthDict: $standWidths,
    depthDict: $standDepths,
})

forward({ from: selectDepth, to: $selectedDepth })
forward({ from: selectHeight, to: $selectedHeight })
forward({ from: selectWidth, to: $selectedWidth })

export { selectDepth, selectWidth, selectHeight, $standSizes, $standSize }
