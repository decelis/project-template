import { locales, sourceLocale } from "./i18n";

export { onBeforeRoute };

function onBeforeRoute(pageContext) {
  const { urlWithoutLocale, locale } = extractLocale(pageContext.urlOriginal);
  return {
    pageContext: {
      // We make `locale` available as `pageContext.locale`. We can then use https://vite-plugin-ssr.com/pageContext-anywhere to access pageContext.locale in any React/Vue component.
      locale,
      // We overwrite the original URL
      urlOriginal: urlWithoutLocale,
    },
  };
}

function extractLocale(url) {
  const urlPaths = url.split("/");

  let locale;
  let urlWithoutLocale;
  // We remove the URL locale, for example `/de-DE/about` => `/about`
  const firstPath = urlPaths[1];
  if (locales.filter((locale) => locale !== sourceLocale).includes(firstPath)) {
    locale = firstPath;
    urlWithoutLocale = "/" + urlPaths.slice(2).join("/");
  } else {
    locale = sourceLocale;
    urlWithoutLocale = url;
  }

  return { locale, urlWithoutLocale };
}
