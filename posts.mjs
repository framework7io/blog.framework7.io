import fs from 'fs';
import path from 'path';

fs.readdirSync('./src/pages').forEach((f) => {
  if (!f.includes('.mdx')) return;
  const fName = f.split('.')[0];
  const hasImage =
    fs.readdirSync('./public/images').filter((i) => i === `${fName}.webp`)
      .length > 0;
  if (!hasImage) return;

  let content = fs.readFileSync(`./src/pages/${f}`, 'utf-8');
  content = content.replace(`.000Z',`, `.000Z',\n  image: '${fName}.webp',`);
  fs.writeFileSync(`./src/pages/${f}`, content);
});
