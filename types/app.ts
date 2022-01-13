export interface IAppProps {
    appData: string
}

interface IProps extends IAppProps {
    [key: string]: any
}

export interface IPageProps {
    pageProps: IProps
}
