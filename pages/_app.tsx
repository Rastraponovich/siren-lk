import { NextPage } from "next"
import React, { useEffect } from "react"

import { Provider as AuthProvider, useSession } from "next-auth/client"
import { Provider } from "effector-react/scope"

import { AppProps } from "next/app"
import Head from "next/head"
// import "@/models/init"
import "@/styles/global.css"
import "tailwindcss/tailwind.css"

import Modal from "react-modal"

import { fork, Scope, serialize } from "effector"

Modal.setAppElement("#__next")

let clientScope: Scope

const App: NextPage<AppProps> = ({ Component, pageProps, router }) => {
    const scope = fork({
        values: {
            ...(clientScope && serialize(clientScope)),
            ...pageProps.initialState,
        },
    })
    if (typeof window !== "undefined") clientScope = scope

    useEffect(() => {
        if (typeof window !== "undefined") {
            // const attachLogger = require("effector-logger/attach").attachLogger
            // attachLogger(null, scope)
        }
    }, [])

    // const scope = useScope(pageProps["initialState"])
    return (
        <AuthProvider session={pageProps.session}>
            <Provider value={scope}>
                <Head>
                    <link rel="icon" href="/favicon.ico" />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
                        rel="stylesheet"
                    />

                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
                        rel="stylesheet"
                    />

                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <Component {...pageProps} router={router} />
            </Provider>
        </AuthProvider>
    )
}

export default App
