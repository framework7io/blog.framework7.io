import { useAnimations } from '@/shared/useAnimations';
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
  useAnimations();
  return (
    <>
      <Head>
        <title>Framework7 Blog</title>
      </Head>
      <div className="space-y-16 md:grid md:grid-cols-2 md:gap-16 md:space-y-0">
        {posts.map((post) => (
          <Link
            href={post.path}
            key={post.title}
            style={{ gridColumn: post.featured ? '1 / span 2' : 'auto' }}
            className={`post-thumb group relative block`}
          >
            <div className="pointer-events-none absolute -left-4 -top-4 -right-4 -bottom-4 -z-10 rounded-2xl bg-surface-3 opacity-0 duration-200 group-hover:opacity-100" />
            <div className="post-thumb-image relative overflow-hidden rounded-xl border border-border bg-surface-1 pb-[60%]">
              {post.image && (
                <img
                  className="absolute left-0 top-0 h-full w-full  object-cover duration-200 group-hover:scale-105"
                  src={`${post.image}`}
                  alt={post.title}
                  loading="lazy"
                />
              )}
            </div>
            <div className="post-thumb-title mt-4 w-fit text-xl font-bold text-primary">
              {post.title}
            </div>
            <div className="post-thumb-date mt-1 text-sm text-on-surface-variant">
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
      const content = fs.readFileSync(`./src/pages/${f}`, 'utf-8');
      const data = {
        path: `/${f.split('.mdx')[0]}`,
        published: true,
      };
      content
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
          if (line.includes('published:')) {
            data.published = !line.includes('published: false');
          }
          if (line.includes('featured: true')) {
            data.featured = true;
          }
        });
      return data;
    })
    .filter((d) => d.published);
  posts.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  return {
    props: {
      posts,
    },
  };
}
