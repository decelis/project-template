import React from "react";
import { type PageContext, PageContextProvider, usePageContext } from "../../renderer/usePageContext";
import { Link } from "../navigation/Link";
import { Trans } from "@lingui/react/macro";

interface PageShellProps {
  pageContext: PageContext;
  children: React.ReactNode;
}

function PageShell(props: PageShellProps): React.ReactNode {

  const context = usePageContext();

  // TODO: solve this on "extractLocale"
  let url = context.urlWithoutLocale ?? "/";

  if (url.includes("index.pageContext.json"))
  {
    const urlParts = url.split("/");
    urlParts.splice(urlParts.length - 1)

    url = urlParts.join("/")
  }

  if (url === "")
  {
    url = "/"
  }

  return (
    <React.StrictMode>
      <PageContextProvider pageContext={context}>
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
          <Link className="font-bold hover:animate-pulse" locale="es" href={url}>
            Español
          </Link>
          <Link className="font-bold hover:animate-pulse" locale="en" href={url}>
            English
          </Link>
          <Link className="font-bold hover:animate-pulse" locale="fr" href={url}>
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
