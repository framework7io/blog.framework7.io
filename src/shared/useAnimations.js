import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

let previousScrollTop;

export const useAnimations = () => {
  const router = useRouter();
  const promiseResolve = useRef(null);
  const routeChangeStartTime = useRef(null);
  const routeChangeCompleteTime = useRef(null);

  const setElements = (thumbEl) => {
    if (!thumbEl) return;
    thumbEl.querySelector('.post-thumb-image').style.viewTransitionName =
      'post-image';
    thumbEl.querySelector('.post-thumb-title').style.viewTransitionName =
      'post-title';
    thumbEl.querySelector('.post-thumb-date').style.viewTransitionName =
      'post-date';
  };
  const unsetElements = () => {
    document.querySelectorAll('.post-thumb').forEach((el) => {
      el.querySelector('.post-thumb-image').style.viewTransitionName = '';
      el.querySelector('.post-thumb-title').style.viewTransitionName = '';
      el.querySelector('.post-thumb-date').style.viewTransitionName = '';
    });
  };

  const onRouteChangeStart = (toUrl) => {
    if (!document.startViewTransition) return;
    routeChangeStartTime.current = new Date().getTime();
    if (router.asPath === '/') {
      const thumbEl = document.querySelector(`.post-thumb[href="${toUrl}"]`);
      previousScrollTop = window.scrollY;
      unsetElements();
      setElements(thumbEl);
    }
    document.startViewTransition(() => {
      const currentTime = new Date().getTime();
      return new Promise((resolve) => {
        if (
          currentTime > routeChangeStartTime.current &&
          currentTime > routeChangeCompleteTime.current
        ) {
          setTimeout(() => {
            resolve();
          });
        } else {
          promiseResolve.current = () => resolve();
        }
      });
    });
  };

  const onRouteChangeComplete = (toUrl) => {
    if (!document.startViewTransition) return;
    routeChangeCompleteTime.current = new Date().getTime();
    if (router.asPath !== '/') {
      const thumbEl = document.querySelector(
        `.post-thumb[href="${router.asPath}"]`
      );
      if (thumbEl) {
        if (previousScrollTop) {
          window.scrollTo(0, previousScrollTop);
        } else {
          const { y } = thumbEl.getBoundingClientRect();
          window.scrollTo(0, y - 64 - 16);
        }
      }
      setElements(thumbEl);
    }

    if (promiseResolve.current) {
      promiseResolve.current();
      promiseResolve.current = null;
    }
  };

  useEffect(() => {
    router.events.on('routeChangeStart', onRouteChangeStart);
    router.events.on('routeChangeComplete', onRouteChangeComplete);
    return () => {
      router.events.off('routeChangeStart', onRouteChangeStart);
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  });
};
