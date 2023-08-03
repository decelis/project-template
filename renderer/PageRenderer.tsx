import React from "react";
import { type PageContext } from "./usePageContext";
import { I18nProvider } from "@lingui/react";
import { i18n } from "@lingui/core";
import { PageShell } from "../components/core/PageShell";

interface PageRendererProps {
  pageContext: PageContext;
  children: React.ReactNode;
}

export function PageRenderer(props: PageRendererProps): React.ReactNode {
  return (
    <I18nProvider i18n={i18n}>
      <PageShell pageContext={props.pageContext}>{props.children}</PageShell>
    </I18nProvider>
  );
}
