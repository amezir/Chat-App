import "@/styles/globals.scss";

export default function App({ Component, pageProps }) {
    return (
        <>
            <title>Chat App by Amézir</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link rel="ico" href="../../public/favicon.ico " />
            <Component {...pageProps} />
        </>
    );
}