export const Header = () => {
  const RootLink = (props) => {
    return (
      <a
        className="block rounded-lg py-[6px] px-2 text-sm font-medium text-primary hover:bg-primary hover:text-on-primary sm:px-3"
        href={props.href}
        target="_blank"
      >
        {props.children}
      </a>
    );
  };
  const Link = (props) => {
    return (
      <a
        className="block rounded-lg px-3 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-on-primary"
        href={props.href}
        target="_blank"
      >
        {props.children}
      </a>
    );
  };
  const Divider = (props) => {
    return <li className="!my-3 block h-px bg-border"></li>;
  };
  return (
    <header className="flex h-16 items-center justify-between bg-surface-2 px-4 lg:px-6">
      <div className="flex items-center space-x-2">
        <img className="h-12 w-12" src="/logo.svg" alt="framework7" />
        <span className="text-2xl font-semibold text-white">Blog</span>
      </div>
      <ul className="flex items-center space-x-1 sm:space-x-2">
        <li className="group relative">
          <RootLink href="https://framework7.io/docs/">Docs</RootLink>
          <ul className="absolute right-0 top-full hidden space-y-0.5 whitespace-nowrap rounded-xl border border-border bg-surface-3 px-4 py-3 text-sm font-medium group-hover:block">
            <li>
              <Link
                className="block rounded-lg px-3 py-1 text-primary hover:bg-primary hover:text-on-primary"
                href="https://framework7.io/docs/introduction.html"
              >
                Getting Started
              </Link>
            </li>
            <Divider />
            <li>
              <Link href="https://framework7.io/docs/">
                Framework7 Core / API
              </Link>
            </li>
            <li>
              <Link href="https://framework7.io/vue/">Framework7 Vue</Link>
            </li>
            <li>
              <Link href="https://framework7.io/react/">Framework7 React</Link>
            </li>
            <li>
              <Link href="https://framework7.io/svelte/">
                Framework7 Svelte
              </Link>
            </li>
            <Divider />
            <li>
              <Link href="https://framework7.io/cli/">Framework7 CLI</Link>
            </li>
            <li>
              <Link href="https://framework7.io/icons/">Framework7 Icons</Link>
            </li>
            <li>
              <Link href="https://framework7.io/docs/dom7.html">Dom7</Link>
            </li>
            <Divider />
            <li>
              <Link href="https://framework7.io/release-notes/">
                Release Notes
              </Link>
            </li>
            <Divider />
            <li>
              <Link href="https://v7.framework7.io/" target="_blank">
                Framework7 v7
              </Link>
            </li>
          </ul>
        </li>
        <li className="group relative">
          <RootLink>Resources</RootLink>
          <ul className="absolute right-0 top-full hidden space-y-0.5 whitespace-nowrap rounded-xl border border-border bg-surface-3 px-4 py-3 text-sm font-medium group-hover:block">
            <li>
              <Link href="https://forum.framework7.io" target="_blank">
                Community Forum
              </Link>
            </li>
            <li>
              <Link href="https://framework7.io/tutorials/">Tutorials</Link>
            </li>
            <li>
              <Link href="https://framework7.io/templates/">Templates</Link>
            </li>
            <li>
              <Link href="https://framework7.io/plugins/">Plugins</Link>
            </li>
            <li>
              <Link href="https://framework7.io/showcase/">Apps Showcase</Link>
            </li>
          </ul>
        </li>
        <li>
          <RootLink href="https://blog.framework7.io">Blog</RootLink>
        </li>
      </ul>
    </header>
  );
};
