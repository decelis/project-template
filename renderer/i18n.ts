import { i18n } from "@lingui/core";

export { initI18n, locales, sourceLocale };

async function initI18n(context) {
  let locale = context.locale;

  if (!locale) {
    locale = sourceLocale;
  }

  const { messages } = await import(`../locales/${locale}/messages.po`);

  i18n.load(context.locale, messages);
  i18n.activate(context.locale);
}

// lingui configuration
var locales = ["en", "es", "fr"];
var sourceLocale = "en";
