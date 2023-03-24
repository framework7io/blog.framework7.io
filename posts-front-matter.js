const fs = require('fs');

fs.readdirSync('./src/pages').forEach((f) => {
  if (!f.includes('.mdx')) return;
  let content = fs.readFileSync(`./src/pages/${f}`, 'utf-8');
  let title;
  content = content
    .split('\n')
    .filter((l, index) => index !== 0)
    .map((l) => {
      if (l.indexOf('date: ') === 0) {
        const date = new Date(l.split('data: ')[1]).toJSON();
        return `date: ${date}`;
      }
      if (l.indexOf('# ') === 0) {
        title = l.split('# ')[1];
      }
      return l;
    })
    .join('\n');
  content.replace('\n# ', '---\n# ');
  content = `---\ntitle: ${title}\n${content}`;
});
