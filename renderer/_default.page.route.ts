import { locales, sourceLocale } from "./i18n";
import { type PageContext } from "./usePageContext";

function onBeforeRoute(pageContext: PageContext): {
  pageContext: { locale: string; urlOriginal: string | undefined };
} {
  const { locale, urlWithoutLocale } = extractLocale(pageContext.urlOriginal);

  return { pageContext: { locale, urlOriginal: urlWithoutLocale } };
}

function extractLocale(url: string | undefined): {
  locale: string;
  urlWithoutLocale: string | undefined;
} {
  let locale = sourceLocale;
  let urlWithoutLocale = url;

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
