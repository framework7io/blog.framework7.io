import Head from 'next/head';
import { useRouter } from 'next/router';

export const PostLayout = (props) => {
  const { children, meta } = props;
  const { title, date, image } = meta;
  const router = useRouter();
  const formatDate = (d) => {
    return Intl.DateTimeFormat('en-us', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(d));
  };
  const onClick = (e) => {
    if (
      e.target.closest('a') &&
      e.target
        .closest('a')
        .getAttribute('href')
        .startsWith('https://blog.framework7.io')
    ) {
      e.preventDefault();
      router.push(
        e.target
          .closest('a')
          .getAttribute('href')
          .split('https://blog.framework7.io')[1]
      );
    }
  };
  return (
    <>
      <Head>
        <title>{`${title} | Framework7 Blog`}</title>
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
      <div className="prose w-full max-w-none" onClick={onClick}>
        {image && (
          <img
            className="post-image !rounded-2xl border border-border"
            src={`/images/${image}`}
          />
        )}
        {date && (
          <div className="post-date mb-2 text-sm text-on-surface-variant text-opacity-75">
            {formatDate(date)}
          </div>
        )}
        <div className="post-content">{children}</div>
      </div>
    </>
  );
};
