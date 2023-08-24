import { i18n } from "@lingui/core";
import { type PageContext } from "./usePageContext";

async function initI18n(context: PageContext): Promise<any> {
  let locale = context.locale;

  if (typeof locale === "undefined" || locale.length === 0) {
    locale = sourceLocale;
  }

  const { messages } = await import(`../locales/${locale ?? ""}/messages.po`);

  i18n.load(context.locale, messages);
  i18n.activate(context.locale);
}

// lingui configuration
const locales = ["en", "es", "fr"];
const sourceLocale = "en";

export { initI18n, locales, sourceLocale };
