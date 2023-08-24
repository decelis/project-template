import React, { useContext } from "react";
import type { PageContextBuiltInClientWithServerRouting } from "vite-plugin-ssr/types";

const Context = React.createContext<PageContext>({
  locale: "",
  Page: null,
  routeParams: {},
  config: {},
  configEntries: {},
  exports: {},
  exportsAll: {},
  url: "",
  urlOriginal: "",
  isClientSideNavigation: false,
  pageExports: {},
  urlParsed: {
    origin: null,
    hash: "",
    hashOriginal: null,
    pathname: "",
    pathnameOriginal: "",
    search: {},
    searchAll: {},
    searchOriginal: "",
    searchString: "",
    hashString: "",
  },
  urlPathname: "",
  isHydration: true,
  isBackwardNavigation: null,
  pageProps: {},
});

export interface PageContextProviderProps {
  pageContext: PageContext;
  children: React.ReactNode;
}

function PageContextProvider(props: PageContextProviderProps): React.ReactNode {
  return (
    <Context.Provider value={props.pageContext}>
      {props.children}
    </Context.Provider>
  );
}

function usePageContext(): PageContext {
  const pageContext = useContext(Context);
  return pageContext;
}

export interface PageContext extends PageContextBuiltInClientWithServerRouting {
  locale: string;
  pageProps: Record<string, unknown>;
}

export { PageContextProvider };
export { usePageContext };
