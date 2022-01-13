import React, { useMemo, useState, useCallback, memo } from "react"
import { Session } from "next-auth"
import { getSession } from "next-auth/client"
import { GetServerSideProps, NextPage } from "next"

import { IOffer } from "@/types/item.types"

import { UIButton, UITable } from "@/components/UI"
import UserInfoPanel from "@/components/PAGES/LK/UserInfoPanel/UserInfoPanel"
import Layout from "@/components/Layout/Layout"
import ExecutorInfoPanel from "@/components/ExecutorPanel/ExecutorInfoPanel"
import { TTableHead } from "@/components/UI/UITable/types"

interface InputProps {
    session: Session
}

const ExecutortPage: NextPage<InputProps> = ({ session }) => {
    const clientOrders = []
    const isLoading = false

    const data = useMemo(
        () =>
            clientOrders.map((item, id) => {
                return { ...item, num: id + 1 }
            }),
        [clientOrders]
    )

    const handleRefreshByClient = () => {
        // dispatch(getOrdersByClient({ id: session.user._id, isServer: false }))
    }

    const handleSortByHeaderCell = useCallback((anchor: string) => {
        console.log(anchor)
    }, [])

    const headersMock: TTableHead[] = useMemo(
        () => [
            { title: "№", anchor: "num", type: undefined },
            {
                title: "Город",
                anchor: "executorId",
                type: undefined,
            },
            { title: "Запрос", anchor: "userId", type: undefined },
            {
                title: "Условия",
                anchor: "status",
                type: "link",
                href: "/lk/executor",
                linkTitle: "Читать",
            },
            { title: "Дата", anchor: "select", type: undefined },
        ],
        [clientOrders]
    )

    return (
        <Layout>
            <main className="flex-grow px-20 pb-20 pt-5 bg-[#f5f5f5]">
                <section>
                    <h2 className="mb-9">Наши заявки</h2>
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-7">
                            <div className=" bg-white px-20 pt-[90px] pb-[76px] rounded-r-lg -ml-20 ">
                                <UITable
                                    data={data}
                                    headers={headersMock}
                                    title="Текущие заявки"
                                    pagination
                                    onLoad={handleRefreshByClient}
                                    loading={isLoading}
                                />
                            </div>
                            <div className=" bg-white px-20 pt-[90px] pb-[76px] rounded-r-lg -ml-20 ">
                                <UITable data={data} headers={headersMock} title="В работе" />
                            </div>
                        </div>

                        <ExecutorInfoPanel />
                    </div>
                </section>
            </main>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getSession(ctx)
    // if (session?.user.role === "Client")
    //     return { redirect: { destination: "/lk", permanent: true } }

    if (session?.user._id) {
        // await dispatch(await getOrdersByClient({ id: session.user._id, isServer: true }))
        return { props: { session } }
    } else {
        return { redirect: { permanent: true, destination: "/" } }
    }
}

export default memo(ExecutortPage)
