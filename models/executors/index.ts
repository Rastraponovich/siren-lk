import { createStore } from "effector"

type TStaticCards = {
    id: number
    fact: string
    text: string
}

type TStaticSteps = {
    id: number
    counter: number
    text: string
    header: string
    content: string
}

const STATICCARDS: TStaticCards[] = [
    { id: 1, fact: "60+", text: "Тарифов по РФ" },
    { id: 2, fact: "-10%", text: "коммисия сервиса" },
    {
        id: 3,
        fact: "1 x 1",
        text: "прямые переговоры с заказчиком",
    },
    { id: 4, fact: "до 40%", text: "рост ваших продаж" },
]

const STATICSTEPS: TStaticSteps[] = [
    {
        id: 1,
        counter: 1,
        text: "шаг",
        header: "оставьте заявку",
        content: "В анкете укажите название, e-mail и телефон.",
    },
    {
        id: 2,
        counter: 2,
        text: "шаг",
        header: " ждите звонка",
        content: "В ближайшее время с Вами свяжется наш менеджер.",
    },
    {
        id: 3,
        counter: 3,
        text: "шаг",
        header: "вы участник сервиса",
        content: "Почаще проверяйте почту и не убирайте телефон. Процесс пошел.",
    },
]

const $staticCards = createStore<TStaticCards[]>(STATICCARDS)

const $staticSteps = createStore<TStaticSteps[]>(STATICSTEPS)

export { $staticCards, $staticSteps }
