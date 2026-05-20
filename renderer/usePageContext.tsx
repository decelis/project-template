import React, { useContext } from "react";
import type { PageContextClient } from "vike/types";

enum Theme {
  User,
  Light,
  Dark,
  Unknown
}

const Context = React.createContext<PageContext | null>(null);

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

  if (pageContext === null) {
    throw Error("Context has not been Provided!");
  }

  return pageContext;
}

export type PageContext = PageContextClient & {
  locale: string;
  pageProps: Record<string, unknown>;
  enforceTheme: Theme;
  mediaTheme: Theme;
  urlWithoutLocale: string;
  title: string;
  metadescription: string;
  Page: (pageProps: any) => JSX.Element
}

export { PageContextProvider };
export { usePageContext };
export { Theme }
