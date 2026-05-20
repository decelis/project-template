import { locales, sourceLocale } from "./i18n.ts";
import { type PageContext } from "./usePageContext.tsx";

function onBeforeRoute(pageContext: PageContext): {
  pageContext: { locale: string; urlLogical: string | undefined; title: string; metadescription: string };
} {
  // TODO: use urlParsed or url in future versions, right now, extract pageContext.json in PageShell
  const { locale, urlWithoutLocale } = extractLocale(pageContext.urlParsed.pathname);

  let metadescription = "metadescripción en español"

  if (locale === "en")
  {
    metadescription = "english metadescription"
  }

  // load default metadescription and title
  return { pageContext: { locale, urlLogical: urlWithoutLocale, title: "Title", metadescription } };
}

function extractLocale(url: string | undefined): {
  locale: string;
  urlWithoutLocale: string;
} {
  let locale = sourceLocale;
  let urlWithoutLocale = url ?? "/";

  if (typeof url !== "undefined") {
    const urlPaths = url.split("/");

    // We remove the URL locale, for example `/de-DE/about` => `/about`
    const firstPath = urlPaths[1];
    if (
      locales.filter((locale) => locale !== sourceLocale).includes(firstPath)
    ) {
      locale = firstPath;
      urlWithoutLocale = "/" + urlPaths.slice(2).join("/");
    }
  }

  return { locale, urlWithoutLocale };
}

export { onBeforeRoute };
