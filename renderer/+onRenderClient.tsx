import React from "react";
import ReactDOM from "react-dom/client";
import { PageRenderer } from "./PageRenderer";

import { PageContextProvider, Theme, type PageContext } from "./usePageContext";
import { reloadDarkMode } from "./darkMode";
import { CookieManagerMode } from "../models/cookieManagerMode";
import { CookieManager } from "../managers/cookieManager";
import { Cookie } from "../models/cookie";
import { initI18n } from "./i18n";

let root: ReactDOM.Root;

async function onRenderClient(pageContext: PageContext): Promise<undefined> {

  await initI18n(pageContext);

  // we need to import the styles in dev for hot reload:
  if (process.env.NODE_ENV === 'development')
  {
    import('../style/main.css');
  }

  const cookieManager = new CookieManager(CookieManagerMode.Document);

  pageContext.mediaTheme = window.matchMedia("(prefers-color-scheme: dark)").matches? Theme.Dark : Theme.Light;
  cookieManager.setCookie(new Cookie("mediaTheme", pageContext.mediaTheme.toString()));

  reloadDarkMode(pageContext);

  const Page = pageContext.Page;

  const page = (
    <PageContextProvider pageContext={pageContext}>
      <PageRenderer>
        <Page {...pageContext.pageProps} {...pageContext.routeParams}/>  
      </PageRenderer>
    </PageContextProvider>
  );

  const container = document.getElementById("page-view") as HTMLElement;

  if (pageContext.isHydration) {
    root = ReactDOM.hydrateRoot(container, page);
  } else {
    root.render(page);
  }
  
  // check if we should travel to hash
  if (window.location.hash !== "") {
    await new Promise(resolve => setTimeout(resolve, 100));
    document.querySelector(window.location.hash)?.scrollTo();
  }
}

export { onRenderClient };
export const clientRouting = true;
export const hydrationCanBeAborted = true;
export const passToClient = ['pageProps', 'routeParams'];
