import { createStore } from "effector"
import { serviceSectionMock } from "./mock"

const $serviceSectionMock = createStore<any[]>(serviceSectionMock)

export { $serviceSectionMock }
