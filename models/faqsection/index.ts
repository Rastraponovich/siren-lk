import { createStore, sample, createEvent } from "effector"
import { aboutWorkMock, paymentMock, primaryMock, tabsMock, TTab } from "./mock"

const changeActiveTab = createEvent<number>()

const $tabs = createStore<TTab[]>(tabsMock)
const $tabsContentMock = createStore<any[]>([aboutWorkMock, primaryMock, paymentMock])
const $activeTab = createStore<number>(0)

sample({
    source: changeActiveTab,
    target: $activeTab,
})

export { $tabs, $activeTab, changeActiveTab, $tabsContentMock }
