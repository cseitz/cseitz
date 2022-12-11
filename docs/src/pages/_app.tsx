import { MantineThemeOverride } from '@mantine/core';
import { NextPageContext } from 'next';
import { AppContext, AppProps } from 'next/app';
import { ThemeProvider } from '../utils/mantine';
import '../styles/global.scss';

function App(props: InitialProps) {
    const { Component, pageProps } = props;
    
    const { colorScheme, firstVisit } = props;
    const theme: MantineThemeOverride = {

    }

    return <ThemeProvider {...{ theme, colorScheme, firstVisit }}>
            {/* <Navigation /> */}
            <Component {...pageProps} />
    </ThemeProvider>
}

type InitialProps = AppProps & Awaited<ReturnType<typeof App.getInitialProps>>;
App.getInitialProps = async function(ctx: AppContext) {
    return {
        ...ThemeProvider.getInitialProps(ctx),
    }
}

export default App;