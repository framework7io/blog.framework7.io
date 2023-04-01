import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <meta name="theme-color" content="#322624" />
      </Head>

      <body className="bg-surface text-on-surface">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
