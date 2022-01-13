import { createStore, createEvent } from "effector"

type TPeople = {
    id: number
    name: string
    date: {
        start: string
        end: string
    }
    photo: string
}
const DEFAULT_VALUE = { id: 0, name: "", date: { start: "", end: "" }, photo: "" }

const $persons = createStore<TPeople[]>([DEFAULT_VALUE])
const add = createEvent()
const set = createEvent<{ index: number; person: TPeople }>()
const remove = createEvent<number>()
const removeAll = createEvent()

$persons.on(add, (state) => [...state, DEFAULT_VALUE])

$persons.on(set, (state, { index, person }) =>
    state.map((item, idx) => {
        if (idx === index) return person
        return item
    })
)

$persons.on(remove, (state, personIndex) => state.filter((item, idx) => idx !== personIndex))

$persons.reset(removeAll)

// const removeAllPersons = createEvent()
// const deletePersonByid = createEvent<number>()
// const addPerson = createEvent<TPeople>()

// const $date = combine({
//     start: $startDate,
//     end: $endDate,
// })

// const $persons = createStore<TPeople[]>([DEFAULT_VALUE])
//     .on(addPerson, (store, user) => [...store, user])
//     .on(deletePersonByid, (prev, props) => prev.filter((item) => item.id !== props))

//     .reset(removeAllPersons)

export { $persons, removeAll, remove, add, set }
