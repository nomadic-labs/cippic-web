import { Head, Html, Main, NextScript } from 'next/document'
export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <link rel="shortcut icon" href="/favicon.svg" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz@9..40&family=Inter:wght@400;600&family=Playfair+Display&display=swap" rel="stylesheet" />
            <script src="https://kit.fontawesome.com/231142308d.js" crossOrigin="anonymous"></script>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
