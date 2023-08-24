import React from "react";
import { usePageContext } from "../../renderer/usePageContext";

import { sourceLocale } from "../../renderer/i18n";

interface LinkProps {
  href: string;
  locale?: string;
  className?: string;
  children: React.ReactNode;
}

function Link(props: LinkProps): React.ReactNode {
  const pageContext = usePageContext();

  const locale = props.locale ?? pageContext.locale;

  let href = props.href;

  if (locale !== sourceLocale) {
    href = "/" + locale + props.href;
  }

  return (
    <a href={href} className={props.className}>
      {props.children}
    </a>
  );
}

export { Link };
