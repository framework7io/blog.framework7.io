import fetch from 'node-fetch';
import fs from 'fs';

const processFile = async (f, content) => {
  const lines = content.split('\n');
  const fileSources = {};

  for (let line of lines) {
    const index = lines.indexOf(line);
    if (line.includes('src="https://medium.com/media')) {
      const src = line.split('src="')[1].split('"')[0];
      const spaces = Array.from({ length: line.length - line.trim().length })
        .map(() => ' ')
        .join('');
      await fetch(src)
        .then((res) => res.text())
        .then((res) => {
          if (res.includes && res.includes('src="https://gist.github.com')) {
            const gistSrc =
              'https://gist.github.com' +
              res.split('src="https://gist.github.com')[1].split('"')[0];
            lines[index] = `${spaces}<Gist src="${gistSrc}" />`;
          }
        });
    }
  }
};

fs.readdirSync('./src/pages').forEach((f) => {
  if (!f.includes('.mdx')) return;
  let content = fs.readFileSync(`./src/pages/${f}`);
  if (content.includes('src="https://medium.com/media')) {
    processFile(f, content);
  }
});
