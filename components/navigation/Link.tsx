import React from "react";
import { i18n } from "@lingui/core";
import { sourceLocale } from "../../renderer/i18n";

interface LinkProps {
  href: string;
  locale?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
}

function Link(props: LinkProps): React.ReactNode {
  const locale = props.locale ?? i18n.locale;

  let href = props.href;
  if (locale !== sourceLocale) {
    href = "/" + locale + props.href;
  }

  return (
    <a onClick={props.onClick} href={href} className={props.className}>
      {props.children}
    </a>
  );
}

export { Link };
