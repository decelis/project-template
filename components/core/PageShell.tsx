import React from "react";
import {
  type PageContext,
  PageContextProvider,
} from "../../renderer/usePageContext";
import { Link } from "../navigation/Link";
import { Trans } from "@lingui/macro";

interface PageShellProps {
  pageContext: PageContext;
  children: React.ReactNode;
}

function PageShell(props: PageShellProps): React.ReactNode {
  return (
    <React.StrictMode>
      <PageContextProvider pageContext={props.pageContext}>
        <header
          className="p-5 bg-slate-300/50 dark:bg-slate-900/50 shadow-md dark:text-white flex 
          gap-10 fixed w-full backdrop-blur"
        >
          <Link className="font-bold hover:animate-pulse" href="/">
            <Trans>Home</Trans>
          </Link>
          <Link className="font-bold hover:animate-pulse" href="/about">
            <Trans>About</Trans>
          </Link>
          <div className="grow" />
          <Link className="font-bold hover:animate-pulse" locale="es" href="/">
            Español
          </Link>
          <Link className="font-bold hover:animate-pulse" locale="en" href="/">
            English
          </Link>
          <Link className="font-bold hover:animate-pulse" locale="fr" href="/">
            Français
          </Link>
        </header>
        <main className="bg-[url('/img/bkg.webp')] pt-[75px] min-h-screen">
          {props.children}
        </main>
      </PageContextProvider>
    </React.StrictMode>
  );
}

export { PageShell };