import { useRef, useEffect } from 'react';

export const Gist = (props) => {
  const { src } = props;
  const elRef = useRef(null);
  const loaded = useRef(false);
  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;
    import('postscribe').then(({ default: postscribe }) => {
      postscribe(elRef.current, `<script src="${src}"></script>`);
    });
  }, []); // eslint-disable-line
  return <div ref={elRef} />;
};
