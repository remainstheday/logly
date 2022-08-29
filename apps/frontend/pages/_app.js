import {ApolloProvider} from "@apollo/client";
import {useApollo} from "apollo/apollo-client";

import Script from "next/script";
import "styles/globals.css";
import "styles/imports.css";
import ClientOnly from "../components/ClientOnly";
import {useEffect, useState} from "react";

export default function App({Component, pageProps}) {
    const apolloClient = useApollo(pageProps);
    const [gtagDate, setGtagDate] = useState();

    useEffect(() => setGtagDate(new Date()))
    return (
        <ApolloProvider client={apolloClient}>
            <Script
                strategy="beforeInteractive"
                async
                src={`https://www.googletagmanager.com/gtag/js?id=UA-212210451-1`}
            />

            {/* Global Site Tag (gtag.js) - Google Analytics */}
            <Script
                strategy="beforeInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=UA-212210451-1`}
            />
            <ClientOnly>
                <Script id="gtag-init" strategy="beforeInteractive">
                    {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', ${gtagDate});
        
            gtag('config', 'UA-212210451-1');
        `}
                </Script>
            </ClientOnly>
            <Component {...pageProps} />
        </ApolloProvider>
    );
}
