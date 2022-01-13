import { createStore } from "effector"
import { createPaginationFactory } from "../factories"

const $limit = createStore(10)

const paginationFactory = createPaginationFactory({ limit: $limit })

export { paginationFactory }
