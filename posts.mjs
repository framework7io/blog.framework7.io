import fetch from 'node-fetch';
import fs from 'fs';

const processFile = async (f, content) => {
  const lines = content.split('\n');
  for (let line of lines) {
    const index = lines.indexOf(line);
    if (line.includes('src="https://medium.com/media')) {
      const src = line.split('src="')[1].split('"')[0];
      await fetch(src)
        .then((res) => res.text())
        .then((res) => {
          if (res.includes && res.includes('(https://cdn-images-1')) {
            const imageSrc =
              'https://cdn-images-1' +
              res.split('(https://cdn-images-1')[1].split(')')[0];
            lines[index] = line.replace(imageSrc, newSrc);
          }
        });
    }
  }
  content = lines.join('\n');
  fs.writeFileSync(`./src/pages/${f}`, content);
};

fs.readdirSync('./src/pages').forEach((f) => {
  if (!f.includes('.mdx')) return;
  let content = fs.readFileSync(`./src/pages/${f}`, 'utf-8');
  if (content.includes('src="https://medium.com/media')) {
    processFile(f, content);
  }
});
