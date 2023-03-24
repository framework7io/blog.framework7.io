import { Header } from '@/components/Header';
// eslint-disable-next-line
import Head from 'next/head';
import '@/styles/globals.scss';

export default function App({ Component, pageProps }) {
  const meta = Component.layoutProps?.meta || {};
  const title = meta.metaTitle || meta.title || 'Framework7 Blog';
  return (
    <>
      <Head>
        {/* eslint-disable-next-line */}
        <title key="title">{title}</title>
        <meta property="og:title" content={title} />
        <meta name="description" content="Framework7 Blog" />
        <meta property="og:description" content="Framework7 Blog" />
        <meta
          property="og:image"
          content="https://blog.framework7.io/images/share-banner.png"
        />
        <meta property="og:site_name" content="Framework7 Blog" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@framework7io" />
        <meta name="twitter:creator" content="@framework7io" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content="Framework7 Blog" />
        <meta
          name="twitter:image"
          content="https://blog.framework7.io/images/share-banner.png"
        />
        <link rel="shortcut icon" href="/images/favicon.png" />
        <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
        <link
          rel="mask-icon"
          sizes="any"
          href="/images/favicon.svg"
          color="#0080FF"
        />
      </Head>
      <Header />
      <main className="mx-auto max-w-screen-lg py-16 px-4 lg:px-6">
        <Component {...pageProps} />
      </main>
    </>
  );
}
