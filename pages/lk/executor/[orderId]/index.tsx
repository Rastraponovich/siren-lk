import { useStore } from "effector-react/scope"
import { GetServerSideProps, NextPage } from "next"
import { allSettled, fork, serialize } from "effector"
import React, { useCallback, useEffect, useMemo, useState } from "react"

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

const OrderInfoPage: NextPage<AppProps> = () => {
    const order = useStore($order)
    const isLoading = false
    //getOrderByIdFx.pending
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

    const data = []

    return (
        <Layout title={`Информация о заказе ${order?.order._id}`}>
            <main className="flex-grow py-8 px-20">
                {/* <button onClick={() => handleGetOrderById("619ceb5652710036d8fac813")}>
                    sdsad
                </button>
                <button onClick={() => handleGetOrderById("619ceb9452710036d8fac816")}>
                    sdsad
                </button> */}

                {isLoading && <div>loading</div>}
                <section className="pt-20">
                    <h2 className="mb-5">Заказ {order.order._id}</h2>
                    <h2 className="mb-5">Статус {order.status}</h2>

                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-7 bg-white px-20 pt-[90px] pb-[76px] rounded-r-lg -ml-20 ">
                            <UITable
                                data={data}
                                headers={headersMock}
                                title="Текущие заявки"
                                pagination
                                onLoad={handleRefreshByClient}
                                loading={isLoading}
                            />
                            <h4 className="mt-14 mb-6">Взаимодействие с заказчиком</h4>
                            <div className="flex justify-between">
                                <fieldset className="flex flex-col w-3/12 border-t-[0.5px] border-solid border-[#404040]">
                                    <legend className="pr-12 mb-7">Заказчик</legend>
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

                                <fieldset className="flex flex-col w-3/12 border-t-[0.5px] border-solid border-[#404040]">
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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const scope = fork()
    await allSettled(getOrderById, { scope, params: params.orderId })

    return { props: { initialState: serialize(scope) } }
}

export default OrderInfoPage
