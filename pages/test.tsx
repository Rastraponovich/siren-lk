import Layout from "@/components/Layout/Layout"
import { UIPagination } from "@/components/UI"
import { paginationFactory } from "@/models/test"
import { createEffect, fork, forward, serialize } from "effector"
import { useEvent } from "effector-react"
import { useStore } from "effector-react/scope"
import { GetStaticProps, NextPage } from "next"
import { FC, useState } from "react"

const Test: NextPage = () => {
    const { $page, $pages, setPage, prevPage, nextPage, limit } = paginationFactory

    const pages = useStore($pages)
    const page = useStore($page)

    const handleNext = useEvent(nextPage)
    const handlePrev = useEvent(prevPage)
    const pagesLimit = useStore(limit)

    const handleSetPage = useEvent(setPage)

    return (
        <Layout>
            <main className="flex-grow flex flex-col justify-center items-center">
                {/* <LoginForm /> */}

                <div>{pages}</div>
                <div>{page}</div>

                <button onClick={handlePrev}>prev</button>
                <button onClick={handleNext}>handleNext</button>

                <button onClick={() => handleSetPage(4)}>handleSetPage</button>

                <UIPagination
                    contentPerPage={pagesLimit}
                    count={pages}
                    page={page}
                    totalPages={pages}
                    setPage={handleSetPage}
                    setContentPerPage={handleSetPage}
                />
            </main>
        </Layout>
    )
}

export default Test

export const getStaticProps: GetStaticProps = async () => {
    const scope = fork()
    const serialized = serialize(scope)
    return {
        props: { initalState: serialized },
    }
}
