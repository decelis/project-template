import React from "react";
import ReactDOM from "react-dom/client";
import "../style/main.css";
import { PageRenderer } from "./PageRenderer";

import { initI18n } from "./i18n";
import { type PageContextClient } from "./usePageContext";


let root: ReactDOM.Root;

async function render(pageContext: PageContextClient): Promise<undefined> {
  // On page load or when changing themes, best to add inline in `head` to avoid FOUC
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  // Whenever the user explicitly chooses light mode
  localStorage.theme = "light";

  // Whenever the user explicitly chooses dark mode
  localStorage.theme = "dark";

  // Whenever the user explicitly chooses to respect the OS preference
  localStorage.removeItem("theme");

  await initI18n(pageContext);

  const Page = pageContext;
  const page = (
    <PageRenderer pageContext={pageContext}>
      <Page />
    </PageRenderer>
  );
  const container = document.getElementById("page-view") as HTMLElement;
  if (pageContext.isHydration) {
    root = ReactDOM.hydrateRoot(container, page);
  } else {
    root.render(page);
  }
}

export { render };
export const clientRouting = true;
export const hydrationCanBeAborted = true;