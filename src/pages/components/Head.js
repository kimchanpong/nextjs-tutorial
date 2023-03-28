import Head from "next/head"

export default function CustomHead({title}) {
    return (
        <Head>
            <title>{title} | Next Movie</title>
        </Head>
    ) 
} 