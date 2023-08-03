import React, { useContext } from "react";
import type { PageContextBuiltIn, PageContextBuiltInClientWithServerRouting } from "vite-plugin-ssr/types";

const Context = React.createContext<PageContext>({} as PageContext);

function PageContextProvider({ pageContext, children }) {
  return <Context.Provider value={pageContext}>{children}</Context.Provider>;
}

function usePageContext() {
  const pageContext = useContext(Context);
  return pageContext;
}

export interface PageContext extends PageContextBuiltIn {
  locale: string;
}

export interface PageContextClient extends PageContextBuiltInClientWithServerRouting {
  locale: string;
}


export { PageContextProvider };
export { usePageContext };
