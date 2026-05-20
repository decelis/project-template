import { CookieManager } from "../managers/cookieManager";
import { Cookie } from "../models/cookie";
import { CookieManagerMode } from "../models/cookieManagerMode";
import { type PageContext, Theme } from "./usePageContext";

function reloadDarkMode(pageContext: PageContext): void
{
    if (shouldSetDarkMode(pageContext)) {
        document.documentElement.classList.add("dark");
    } 
      
    else {
    document.documentElement.classList.remove("dark");
    }
}

function shouldSetDarkMode(context: PageContext): boolean
{
    return context.enforceTheme === Theme.Dark ||
        (context.enforceTheme === Theme.User &&
        context.mediaTheme === Theme.Dark)
}

function toggleTheme(context: PageContext): void
{
    const cookieManager = new CookieManager(CookieManagerMode.Document);
    const darkMode = !shouldSetDarkMode(context);

    if ((window.matchMedia("(prefers-color-scheme: dark)").matches && darkMode) || 
        (!window.matchMedia("(prefers-color-scheme: dark)").matches && !darkMode))
    {
        context.enforceTheme = Theme.User
    }

    else
    {
        context.enforceTheme = darkMode? Theme.Dark : Theme.Light;
    }

    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);

    cookieManager.setCookie(new Cookie("enforceTheme", context.enforceTheme.toString(), expires))

    reloadDarkMode(context);
}

export { reloadDarkMode, shouldSetDarkMode, toggleTheme};
