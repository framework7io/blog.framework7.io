const execSh = require("exec-sh");

const posts = [
  'http://blog.framework7.io/framework7-next-js-server-side-rendering-yes-1f6c9334dc03',
  'http://blog.framework7.io/framework7-v6-d5b843abe8e7',
  'http://blog.framework7.io/framework7-svelte-e6634910f2b6',
  'http://blog.framework7.io/migration-to-framework7-v5-1374257bb5a7',
  'http://blog.framework7.io/framework7-v5-679176716faa',
  'http://blog.framework7.io/framework7-4-4-0-treeview-1616c2fec4b0',
  'http://blog.framework7.io/framework7-4-3-0-the-most-colorful-update-47175a880c5e',
  'http://blog.framework7.io/meet-aurora-new-framework7-desktop-theme-b4064c5b6040',
  'http://blog.framework7.io/migration-to-framework7-v4-89d1ce49f4c0',
  'http://blog.framework7.io/the-best-framework7-yet-what-is-new-in-v4-74b2b467047c',
  'http://blog.framework7.io/framework7-icons-v2-1bb74ef5055a',
  'http://blog.framework7.io/superpowered-router-components-in-framework7-3-1-0-296f598aeb99',
  'http://blog.framework7.io/migration-to-framework7-v3-928a21a1eac9',
  'http://blog.framework7.io/framework7-v3-is-coming-soon-e327e9c10480',
  'http://blog.framework7.io/built-with-framework7-brief-customer-messaging-app-76497d56a2d3',
  'http://blog.framework7.io/migration-to-framework7-v2-eb6dc38ede3b',
  'http://blog.framework7.io/framework7-has-partnered-with-video-intelligence-vi-c16f6705c112',
  'http://blog.framework7.io/mastering-v2-router-958ea2dbd24f',
  'http://blog.framework7.io/framework7-v2-beta-41f983d6e89d',
  'http://blog.framework7.io/welcome-to-framework7-blog-3500c27cbfed',
]

const build = async () => {
  for (let post of posts) {
    const fileName = post.split('http://blog.framework7.io/')[1].split('-').filter((val, index, arr) => {
      return index !== arr.length - 1
    }).join('-');
    await execSh.promise(`npx mediumexporter ${post} > ./src/pages/${fileName}.mdx -H`)
  }
}

build();
