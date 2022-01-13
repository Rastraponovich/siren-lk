import { useStore } from "effector-react/scope"
import { GetServerSideProps, NextPage } from "next"
import { allSettled, fork, serialize } from "effector"
import React, { useCallback, useMemo } from "react"

import { AppProps } from "next/app"

import Layout from "@/components/Layout/Layout"
import { UITable } from "@/components/UI"
import { ICatalogOrderItem } from "@/types/item.types"
import Chat from "@/components/Chat/Chat"
import OrderInfo from "@/components/OrderInfo/OrderInfo"
import { TTableHead } from "@/components/UI/UITable/types"
import { $order, getOrderById } from "@/models/orders"
import { IOrder } from "@/types/order.types"
import { useEvent } from "effector-react"
import { RightArrowIcon } from "@/components/UI/icons"
import UIBreadCrumbsStatic from "@/components/UI/UIBreadCrumbsStatic/UIBreadCrumbsStatic"
import { getSession, useSession } from "next-auth/client"

const OrderInfoPage: NextPage<AppProps> = () => {
    const order = useStore($order)
    // const isLoading = useStore(getOrderById)

    // const{initialValues} = useFormik()
    // const handleGetOrderById = useEvent(getOrderById)

    const handleRefreshByClient = useCallback(() => {}, [])

    const headersMock: TTableHead[] = useMemo(
        () => [
            { title: "№", anchor: "num" },
            {
                title: "Заказчик",
                anchor: "clientId",
            },
            { title: "Город", anchor: "City" },
            { title: "Запрос", anchor: "orderId" },
            { title: "Условия", anchor: "rules" },
            { title: "Дата", anchor: "date" },
        ],
        []
    )
    const breadCrumbs = [
        { id: 1, name: "Главная", href: "/", separator: <RightArrowIcon /> },
        { id: 2, name: "Памятники", href: "/catalog", separator: <RightArrowIcon /> },
        { id: 3, name: "Личный кабинет", href: "/lk" },
    ]

    const data = []

    return (
        <Layout title={`Информация о заказе ${order && order.order && order.order._id}`}>
            <main className="flex-grow px-20 py-8 bg-[#F5F5F5]">
                <UIBreadCrumbsStatic dict={breadCrumbs} className="mb-[48px]" />

                <section>
                    <h2 className="mb-[50px] font-semibold font-IBMPlexSans text-[26px] leading-[18px] text-[color:#121212]">
                        Наши заявки
                    </h2>
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-7 bg-white px-20 pt-4 pb-4 rounded-r-lg -ml-20 ">
                            <UITable
                                data={data}
                                headers={headersMock}
                                title="Текущие заявки"
                                pagination
                                onLoad={handleRefreshByClient}
                                loading={false}
                            />
                            <h4 className="mt-[53px] mb-6">Взаимодействие с исполнителем</h4>
                            <div className="grid grid-cols-12">
                                <fieldset className="flex flex-col  border-t-[0.5px] border-solid border-[#404040] col-span-3">
                                    <legend className="mb-7 pr-12 first-letter:uppercase">
                                        исполнитель
                                    </legend>
                                    <span className="mb-2.5 text-[color:#47474f] text-opacity-60">
                                        ФИО
                                    </span>
                                    <span className="mb-2.5 text-[color:#47474f] text-opacity-60">
                                        Телефон
                                    </span>
                                    <span className="mb-2.5 text-[color:#47474f] text-opacity-60">
                                        Email
                                    </span>

                                    <span className=" text-[color:#47474f] text-opacity-60">
                                        Город
                                    </span>
                                </fieldset>

                                <fieldset className="flex flex-col  border-t-[0.5px] border-solid border-[#404040] col-span-7 col-end-13">
                                    <legend className="mb-7 pr-12">История перговоров</legend>
                                    <Chat />
                                </fieldset>
                            </div>
                        </div>
                        <div className="col-span-4 col-start-9 col-end-13">
                            <OrderInfo />
                        </div>
                    </div>
                </section>
            </main>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (props) => {
    const { params, req } = props
    const session = await getSession({ req })

    const scope = fork()
    await allSettled(getOrderById, { scope, params: params.orderId })
    if (!session.isActivated || session.user.role !== "Client")
        return { redirect: { permanent: true, destination: "/" } }

    return { props: { initialState: serialize(scope) } }
}

export default OrderInfoPage
