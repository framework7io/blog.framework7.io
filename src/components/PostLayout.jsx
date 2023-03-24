import Head from 'next/head';

export const PostLayout = (props) => {
  const { children, meta } = props;
  const { title, date } = meta;
  const formatDate = (d) => {
    return Intl.DateTimeFormat('en-us', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(d));
  };
  return (
    <>
      <Head>
        <title key="title">{title}</title>
        <meta property="og:title" content={title} />
        <meta name="twitter:title" content={title} />
      </Head>
      <div className="prose w-full max-w-none">
        {date && (
          <div className="text-sm text-on-surface-variant text-opacity-75">
            {formatDate(date)}
          </div>
        )}
        {children}
      </div>
    </>
  );
};
