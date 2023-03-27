import fs from 'fs';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

export default function Home(props) {
  const { posts } = props;
  const promiseResolved = useRef(null);
  const router = useRouter();
  const formatDate = (d) => {
    return Intl.DateTimeFormat('en-us', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(d));
  };
  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      if (promiseResolved.current) promiseResolved.current();
      promiseResolved.current = null;
    });
  }, []);
  const onClick = (e, url) => {
    if (!document.startViewTransition) return;
    e.preventDefault();
    const imageEl = e.target.closest('a').querySelector('.post-thumb-image');
    const titleEl = e.target.closest('a').querySelector('.post-thumb-title');
    const dateEl = e.target.closest('a').querySelector('.post-thumb-date');
    imageEl.style.viewTransitionName = 'post-image';
    titleEl.style.viewTransitionName = 'post-title';
    dateEl.style.viewTransitionName = 'post-date';
    document.startViewTransition(async () => {
      imageEl.style.viewTransitionName = '';
      return new Promise((resolve) => {
        promiseResolved.current = () => {
          resolve();
        };
      });
    });
    router.push(url);
  };
  return (
    <>
      <Head>
        <title>Framework7 Blog</title>
      </Head>
      <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
        {posts.map((post) => (
          <a
            onClick={(e) => onClick(e, post.path)}
            href={post.path}
            key={post.title}
            className="group relative"
          >
            <div className="pointer-events-none absolute -left-4 -top-4 -right-4 -bottom-4 -z-10 rounded-2xl bg-surface-3 opacity-0 duration-200 group-hover:opacity-100" />
            <div className="post-thumb-image relative overflow-hidden rounded-xl border border-border bg-surface-1 pb-[60%]">
              {post.image && (
                <img
                  className="absolute left-0 top-0 h-full w-full  object-cover duration-200 group-hover:scale-105"
                  src={`/images/${post.image}`}
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
          </a>
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
