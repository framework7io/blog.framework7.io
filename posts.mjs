import fetch from 'node-fetch';
import fs from 'fs';
import slugify from '@sindresorhus/slugify';
import path from 'path';

const processFile = async (f, content) => {
  const lines = content.split('\n');
  let title;
  let imageIndex = 0;
  for (let line of lines) {
    if (line.includes(`  title: '`) && !title) {
      title = slugify(line.split(`  title: '`)[1].split(`'`)[0]);
    }
    const index = lines.indexOf(line);
    if (line.includes('(https://cdn-images-1')) {
      const imageSrc =
        'https://cdn-images-1' +
        line.split('(https://cdn-images-1')[1].split(')')[0];
      const imageFileName = `${title}-${imageIndex}${path.extname(imageSrc)}`;
      imageIndex += 1;
      lines[index] = line.replace(imageSrc, `/images/${imageFileName}`);

      // await fetch(imageSrc)
      //   .then((res) =>
      //     res.body.pipe(
      //       fs.createWriteStream(`./public/images/${imageFileName}`)
      //     )
      //   )
      //   .then((res) => {
      //     lines[index] = line.replace(imageSrc, newSrc);
      //   });
    }
  }
  content = lines.join('\n');
  fs.writeFileSync(`./src/pages/${f}`, content);
};

fs.readdirSync('./src/pages').forEach((f) => {
  if (!f.includes('.mdx')) return;
  let content = fs.readFileSync(`./src/pages/${f}`, 'utf-8');
  if (content.includes('(https://cdn-images-1')) {
    processFile(f, content);
  }
});
