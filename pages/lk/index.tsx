import Layout from "@/components/Layout/Layout"
import { useSession, getSession } from "next-auth/client"
import React, { memo, FC } from "react"
import { GetServerSideProps } from "next"

const LK: FC = () => {
    return (
        <Layout>
            <main style={{ flexGrow: 1 }}></main>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getSession(ctx)

    if (session?.user?.role === "Client")
        return { redirect: { destination: "/lk/client", permanent: true } }
    if (session?.user?.role === "Executor")
        return { redirect: { destination: "/lk/executor", permanent: true } }
}
export default memo(LK)
