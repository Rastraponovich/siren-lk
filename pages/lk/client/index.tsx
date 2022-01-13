import React, { useMemo, useState, useCallback, memo } from "react"
import { Session } from "next-auth"
import Image from "next/image"

import { getSession } from "next-auth/client"
import { GetServerSideProps, NextPage } from "next"

import { IOffer } from "@/types/item.types"

import { UIButton, UITable } from "@/components/UI"
import UserInfoPanel from "@/components/PAGES/LK/UserInfoPanel/UserInfoPanel"
import Layout from "@/components/Layout/Layout"
import { TTableHead } from "@/components/UI/UITable/types"
import { useEvent, useStore } from "effector-react"
import { $orders, getAllOrdersByClient } from "@/models/orders"
import { allSettled, fork, serialize } from "effector"
import { RightArrowIcon } from "@/components/UI/icons"

import UILKTablePaper from "@/components/UI/UILKTablePaper/UILKTablePaper"
import UIBreadCrumbsStatic from "@/components/UI/UIBreadCrumbsStatic/UIBreadCrumbsStatic"
import UserInfoPanelAvatar from "@/components/PAGES/LK/UserInfoPanel/UserInfoPanelAvatar"

interface ClientPageProps {}
{
    /* <circle cx="26" cy="26" r="26" fill="#313131"/> */
}
//
const DefaultImg =
    () => `<svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.0281 29.9447C18.9931 28.9796 20.3019 28.4375 21.6667 28.4375H30.3334C31.6981 28.4375 33.007 28.9797 33.972 29.9447C34.9371 30.9097 35.4792 32.2186 35.4792 33.5833V35.75C35.4792 36.1987 35.1154 36.5625 34.6667 36.5625C34.218 36.5625 33.8542 36.1987 33.8542 35.75V33.5833C33.8542 32.6496 33.4833 31.754 32.823 31.0937C32.1627 30.4334 31.2672 30.0625 30.3334 30.0625H21.6667C20.7329 30.0625 19.8374 30.4334 19.1771 31.0937C18.5168 31.754 18.1459 32.6495 18.1459 33.5833V35.75C18.1459 36.1987 17.7821 36.5625 17.3334 36.5625C16.8846 36.5625 16.5209 36.1987 16.5209 35.75V33.5833C16.5209 32.2186 17.063 30.9097 18.0281 29.9447Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M26 17.0625C24.0555 17.0625 22.4791 18.6388 22.4791 20.5833C22.4791 22.5278 24.0555 24.1042 26 24.1042C27.9445 24.1042 29.5208 22.5278 29.5208 20.5833C29.5208 18.6388 27.9445 17.0625 26 17.0625ZM20.8541 20.5833C20.8541 17.7414 23.158 15.4375 26 15.4375C28.8419 15.4375 31.1458 17.7414 31.1458 20.5833C31.1458 23.4253 28.8419 25.7292 26 25.7292C23.158 25.7292 20.8541 23.4253 20.8541 20.5833Z" fill="white"/>
</svg>
`

const ClientPage: NextPage<ClientPageProps> = () => {
    //TODO Effector
    // const isLoading = useStore(getAllOrdersByClientFx.pending)
    const clientOrders = useStore($orders)

    // const [orders, setOrders] = useState<IOrder[]>(clientOrders)
    // const [offers, setOffers] = useState<IOffer[]>([])
    // const [offer] = useState<IOffer>()

    const data = useMemo(
        () =>
            clientOrders.map((item, id) => {
                return { ...item, num: id + 1 }
            }),
        [clientOrders]
    )

    // const setExecutor = async () => {
    //     await api.get(`/setExecutor/${offer.executorId._id}`)
    // }

    // const handleGetOrderById = async (id: string) => {
    //     await dispatch(await getOrderByIdAction(id, false))
    // }

    //TODO Effector
    const handleRefreshByClient = () => {
        // dispatch(getOrdersByClient({ id: session.user._id, isServer: false }))
    }

    // useEffect(() => {
    //     setOrders(clientOrders)
    // }, [clientOrders])

    const handleSortByHeaderCell = useCallback((anchor: string) => {
        console.log(anchor)
    }, [])

    const headersMock: TTableHead[] = useMemo(
        () => [
            { title: "№", anchor: "num", sorting: true, onSort: handleSortByHeaderCell },
            {
                title: "Исполнитель",
                anchor: "executorId",
                sorting: true,
                onSort: handleSortByHeaderCell,
            },
            { title: "Заказ", anchor: "userId", sorting: true, onSort: handleSortByHeaderCell },
            { title: "Статус", anchor: "status", sorting: true, onSort: handleSortByHeaderCell },
            {
                title: "Выбор",
                anchor: "select",
                type: "link",
                href: "/lk/client",
                value: "order._id",
            },
        ],
        [clientOrders]
    )

    const breadCrumbs = [
        { id: 1, name: "Главная", href: "/", separator: <RightArrowIcon /> },
        { id: 2, name: "Памятники", href: "/catalog", separator: <RightArrowIcon /> },
        { id: 3, name: "Личный кабинет", href: "/lk" },
    ]

    return (
        <Layout>
            <main className="flex-grow px-20 pb-20 pt-5 bg-[#f5f5f5]">
                <UIBreadCrumbsStatic dict={breadCrumbs} />
                <h2 className="mb-7 text-[color:#121212] font-IBMPlexSans font-semibold text-[26px] leading-4">
                    Мои заявки
                </h2>
                <section className="grid grid-cols-12 ">
                    <div className="col-span-8">
                        <UILKTablePaper>
                            <h3 className="font-RobotoMono text-[18px] leading-[44px] text-black mb-3">
                                Текущие заявки
                            </h3>

                            <UITable
                                data={data}
                                headers={headersMock}
                                pagination
                                onLoad={handleRefreshByClient}
                                loading={false}
                                cellsClassName="break-words text-sm leading-[17px] text-center py-4 text-center "
                            />
                        </UILKTablePaper>
                        <UILKTablePaper>
                            <UITable
                                data={data}
                                headers={headersMock}
                                title="Предложения исполнителей"
                                cellsClassName="break-words text-sm leading-[17px] text-center py-4 text-center "
                            />
                            <UIButton className="px-10 py-4 mt-8">Выбрать исполнителя</UIButton>
                        </UILKTablePaper>
                    </div>
                    <div className="col-span-3 col-end-13">
                        <UserInfoPanelAvatar />
                        <UserInfoPanel />
                    </div>
                </section>
            </main>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const scope = fork({ values: [[$orders, []]] })
    const session = await getSession(ctx)

    if (session?.user._id) {
        await allSettled(getAllOrdersByClient, {
            scope,
            params: session.user._id,
        })
        return { props: { session, initialState: serialize(scope) } }
    } else {
        return { redirect: { permanent: true, destination: "/" } }
    }
}

export default ClientPage
