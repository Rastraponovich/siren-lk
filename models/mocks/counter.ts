import { createStore } from "effector"
import { TDataCounters, dataCounters } from "./mock"

const $counters = createStore<TDataCounters[]>(dataCounters)

export { $counters }
