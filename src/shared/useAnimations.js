import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

let allowRouting = false;

export const useAnimations = () => {
  const router = useRouter();
  const promiseResolve = useRef(null);

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
    if (!allowRouting) {
      if (router.asPath === '/') {
        const thumbEl = document.querySelector(`.post-thumb[href="${toUrl}"]`);
        unsetElements();
        setElements(thumbEl);
      } else {
      }
      document.startViewTransition(() => {
        allowRouting = true;
        router.push(toUrl);
        return new Promise((resolve) => {
          promiseResolve.current = resolve;
        });
      });
      throw 'error';
    }
  };

  const onRouteChangeComplete = (toUrl) => {
    if (!document.startViewTransition) return;
    allowRouting = false;
    if (router.asPath !== '/') {
      const thumbEl = document.querySelector(
        `.post-thumb[href="${router.asPath}"]`
      );
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
