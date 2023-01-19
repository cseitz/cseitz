import { NotificationsProvider } from '@mantine/notifications';
import { withMantine } from '../utils/mantine';
import { createContext } from 'react';
import { Router } from 'next/router';
import { AppProps } from 'next/app';


declare global {
    export interface AppInitialProps extends AppProps {
        pageProps: AppInitialPageProps
    }
    export interface AppInitialPageProps {

    }
}

export const InitialRouter = createContext<Router>(null as any);

function App(props: AppInitialProps) {
    const { Component, pageProps } = props;

    return <InitialRouter.Provider value={props.router}>
        <NotificationsProvider>
            <Component {...pageProps} />
        </NotificationsProvider>
    </InitialRouter.Provider>
}


export default withMantine(App, {
    cookie: `cseitz-color-scheme`,
    withGlobalStyles: true,
    withNormalizeCSS: true,
})