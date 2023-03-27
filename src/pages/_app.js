import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
// eslint-disable-next-line
import Head from 'next/head';
import '@/styles/globals.scss';
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* eslint-disable-next-line */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Framework7 Blog" />
        <meta property="og:description" content="Framework7 Blog" />

        <meta property="og:site_name" content="Framework7 Blog" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@framework7io" />
        <meta name="twitter:creator" content="@framework7io" />
        <meta name="twitter:description" content="Framework7 Blog" />

        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <Header />
      <main className="mx-auto max-w-screen-lg py-16 px-4 md:px-6 lg:px-8">
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}
