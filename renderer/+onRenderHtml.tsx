import ReactDOMServer from "react-dom/server";
import React from "react";
import { PageContextProvider, type PageContext } from "./usePageContext";
import { PageRenderer } from "./PageRenderer";
import { sourceLocale, locales, initI18n } from "./i18n";
import { shouldSetDarkMode } from "./darkMode";
import { Writable } from "stream";
import { dangerouslySkipEscape } from "vike";

async function onRenderHtml(pageContext: PageContext): Promise<{ _escaped: string }> {
  await initI18n(pageContext);

  return await new Promise((resolve, reject) => {
    const { Page, pageProps } = pageContext;
    let result = "";

    // Create a custom writable stream to capture the output
    const writable = new Writable({
      write(chunk, _, callback) {
        result += chunk.toString() as string;
        callback();
      },
    });

    const { pipe } = ReactDOMServer.renderToPipeableStream(
      <html className={shouldSetDarkMode(pageContext) ? "dark" : ""} lang={pageContext.locale}>
        <head>
          <title>{pageContext.title}</title>
          <meta charSet="UTF-8" />
          <meta name="description" content={pageContext.metadescription}></meta>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="icon" type="image/x-icon" href="/img/favicon.svg" />

          {
            // Import styles only in production (development handles styles in the client for hot reload)
            process.env.NODE_ENV === "production" ? (
              <link rel="stylesheet" href="/styles.css" media="print" id="main-css" />
            ) : (
              <></>
            )
          }

          <script
            dangerouslySetInnerHTML={{
              __html: `
              const link = document.getElementById('main-css');
              link.addEventListener('load', () => {
              link.media = 'all';
            });
            `,
            }}
          ></script>
        </head>
        <body>
          <div id="page-view">
            <PageContextProvider pageContext={pageContext}>
              <PageRenderer>
                <Page {...pageProps} {...pageContext.routeParams} />
              </PageRenderer>
            </PageContextProvider>
          </div>
        </body>
      </html>,
      {
        onShellReady() {
          pipe(writable);
        },
        onError(error) {
          reject(error);
        },
      },
    );

    // Resolve the promise when the stream ends
    writable.on("finish", () => {
      resolve(dangerouslySkipEscape(result));
    });

    // Reject the promise if there’s an error with the stream
    writable.on("error", (error) => {
      reject(error);
    });
  });
}

export { onRenderHtml };
