import { GetStaticProps, NextPage } from "next"
import React, { memo } from "react"

import Layout from "@/components/Layout/Layout"
import { fork, serialize } from "effector"
import LoginModule from "@/components/LoginModule/LoginModule"
import LoginForm from "@/components/LoginForm/LoginForm"

const StartPage: NextPage = () => {
    return (
        <Layout>
            <main className="flex grow flex-col bg-[#2D2D2D] p-20">
                <LoginForm />
            </main>
        </Layout>
    )
}

export default memo(StartPage)

export const getStaticProps: GetStaticProps = async () => {
    const scope = fork()
    const serialized = serialize(scope)

    return { props: { initialState: serialized } }
}
