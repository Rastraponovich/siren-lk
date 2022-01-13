import React, { memo, FC, ReactNode } from "react"
import Head from "next/head"

import Footer from "@/components/Footer/Footer"
import Header from "@/components/Header/Header"
import dynamic from "next/dynamic"

const MobileNavPanel = dynamic(() => import("../MobileNavPanel/MobileNavPanel"), {
    ssr: false,
    loading: () => <p>...</p>,
})

interface InputProps {
    children: ReactNode
    title?: string
}

const Layout: FC<InputProps> = ({ children, title }) => {
    return (
        <>
            <Head>
                <title>Сирень {title}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
                    rel="stylesheet"
                /> */}
            </Head>
            <Header />
            {children}

            <MobileNavPanel />
            <Footer />
        </>
    )
}

export default memo(Layout)
