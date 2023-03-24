import Head from 'next/head';

export const PostLayout = (props) => {
  const { children, meta } = props;
  const { title, date, image } = meta;
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
        <title key="title">{title} | Framework7 Blog</title>
        <meta property="og:title" content={title} />
        <meta name="twitter:title" content={title} />
        {image && (
          <>
            <meta
              property="og:image"
              content={`https://blog.framework7.io/images/${image}`}
            />
            <meta
              name="twitter:image"
              content={`https://blog.framework7.io/images/${image}`}
            />
          </>
        )}
      </Head>
      <div className="prose w-full max-w-none">
        {image && (
          <img
            className="rounded-xl border border-border"
            src={`/images/${image}`}
          />
        )}
        {date && (
          <div className="mb-2 text-sm text-on-surface-variant text-opacity-75">
            {formatDate(date)}
          </div>
        )}
        {children}
      </div>
    </>
  );
};
