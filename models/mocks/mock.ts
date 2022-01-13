export type TDataCounters = {
    id: number
    count: string
    icon: string
    text: string
}

export const dataCounters: TDataCounters[] = [
    {
        id: 1,
        count: "250+",
        icon: "/assets/image/sections/countersSection/sales.svg",
        text: "Куплено",
    },
    {
        id: 2,
        count: "47+",
        icon: "/assets/image/sections/countersSection/regions.svg",
        text: "Регионов",
    },
    {
        id: 3,
        count: "61+",
        icon: "/assets/image/sections/countersSection/executors.svg",
        text: "Исполнитель",
    },
    {
        id: 4,
        count: "15%",
        icon: "/assets/image/sections/countersSection/economics.svg",
        text: "Экономия",
    },
]

export const serviceSectionMock = [
    {
        title: "Вертикальный",
        image: "/assets/image/sections/service/vertical.jpg",
        id: 1,
        path: "/catalog/vertikalnie",
    },
    {
        title: "Горизонтальный",
        image: "/assets/image/sections/service/horizontal.jpg",
        id: 2,
        path: "/catalog/gorizontalnie",
    },
    {
        title: "Декоративный",
        image: "/assets/image/sections/service/decor.jpg",
        id: 3,
        path: "/catalog/decorativnie",
    },
    {
        title: "Крестообразные",
        image: "/assets/image/sections/service/krest.jpg",
        id: 4,
        path: "/catalog/kresty",
    },
    {
        title: "Мусульманские",
        image: "/assets/image/sections/service/muslim.jpg",
        id: 5,
        path: "/catalog/musulmanskie",
    },
    {
        title: "Мемориальный комплекс",
        image: "/assets/image/sections/service/complex.jpg",
        id: 6,
        path: "/catalog",
    },
]
