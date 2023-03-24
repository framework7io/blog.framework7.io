import fs from 'fs';
import Head from 'next/head';
import Link from 'next/link';

export default function Home(props) {
  const { posts } = props;
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
        <title>Framework7 Blog</title>
      </Head>
      <div className="grid grid-cols-2 gap-16">
        {posts.map((post) => (
          <Link href={post.path} key={post.title} className="group relative">
            <div className="pointer-events-none absolute -left-4 -top-4 -right-4 -bottom-4 -z-10 rounded-2xl bg-surface-3 opacity-0 duration-200 group-hover:opacity-100" />
            <div className="relative overflow-hidden rounded-xl bg-surface-1 pb-[60%]">
              {post.image && (
                <img
                  className="absolute left-0 top-0 h-full w-full object-cover duration-200 group-hover:scale-105"
                  src={`/images/${post.image}`}
                  alt={post.title}
                />
              )}
            </div>
            <div className="mt-4 text-xl font-bold text-primary">
              {post.title}
            </div>
            <div className="mt-1 text-sm text-on-surface-variant">
              {formatDate(post.date)}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export async function getStaticProps(context) {
  const posts = fs
    .readdirSync('./src/pages')
    .filter((f) => f.includes('.mdx'))
    .map((f) => {
      const data = {
        path: `/${f.split('.mdx')[0]}`,
      };
      fs.readFileSync(`./src/pages/${f}`, 'utf-8')
        .split('export const meta = {')[1]
        .split('}')[0]
        .trim()
        .split('/n')
        .forEach((line) => {
          if (line.includes('title:')) {
            data.title = line.split(`title: '`)[1].split(`'`)[0];
          }
          if (line.includes('image:')) {
            data.image = line.split(`image: '`)[1].split(`'`)[0];
          }
          if (line.includes('date:')) {
            data.date = line.split(`date: '`)[1].split(`'`)[0];
          }
        });
      return data;
    });
  posts.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  return {
    props: {
      posts,
    },
  };
}
