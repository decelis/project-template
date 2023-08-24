import ReactDOMServer from "react-dom/server";
import React from "react";
import { escapeInject, dangerouslySkipEscape } from "vite-plugin-ssr/server";
import { type PageContext } from "./usePageContext";
import { PageRenderer } from "./PageRenderer";

import { sourceLocale, locales, initI18n } from "./i18n";
import { type TemplateWrapped } from "vite-plugin-ssr/dist/types/node/runtime/html/renderHtml";

const passToClient = ["pageProps", "locale"];

async function render(pageContext: PageContext): Promise<TemplateWrapped> {
  const { Page, pageProps } = pageContext;

  await initI18n(pageContext);

  const pageHtml = ReactDOMServer.renderToString(
    <PageRenderer pageContext={pageContext}>
      <Page {...pageProps} />
    </PageRenderer>,
  );

  return escapeInject`<!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/x-icon" href="/img/favicon.svg">
      </head>
      <body class="dark:bg-gray-950">
        <div id="page-view">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`;
}

// We only need this for pre-rendered apps https://vite-plugin-ssr.com/pre-rendering
function onBeforePrerender(prerenderContext: { pageContexts: PageContext[] }): {
  prerenderContext: {
    /* ... */
  };
} {
  const pageContexts: PageContext[] = [];
  prerenderContext.pageContexts.forEach((pageContext) => {
    // Duplicate pageContext for each locale
    locales.forEach((locale) => {
      // Localize URL
      let { urlOriginal } = pageContext;

      if (locale !== sourceLocale) {
        urlOriginal = `/${locale}${pageContext.urlOriginal ?? ""}`;
      }

      pageContexts.push({
        ...pageContext,
        urlOriginal,
        locale,
      });
    });
  });

  return {
    prerenderContext: {
      pageContexts,
    },
  };
}

export { render };
export { passToClient };
export { onBeforePrerender };
