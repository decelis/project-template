import { CookieManagerMode } from "../models/cookieManagerMode.ts";
import { Cookie } from "../models/cookie.ts";

class CookieManager {

    #mode: CookieManagerMode;
    #cookieList: Map<string, Cookie> = new Map<string, Cookie>();
    #cookiesToSet: Map<string, Cookie> = new Map<string, Cookie>();

    constructor(mode: CookieManagerMode = CookieManagerMode.Document, initialCookies: string | undefined = undefined) {
        this.#mode = mode;

        // parse initialCookies, if any
        if (mode === CookieManagerMode.OnDemand && typeof(initialCookies) !== "undefined")
        {
            this.#appendCookieString(initialCookies);
        }
        else if (mode === CookieManagerMode.Document) {
            this.#appendCookieString(document.cookie);
        }
    }

    #appendCookieString(cookieString: string): void
    {
        let parts: string[];

        if (cookieString.includes(";"))
        {
            parts = cookieString.split(";")
        }
        else
        {
            parts = [cookieString];
        }

        for (const part of parts)
        {
            if (part.includes("="))
            {
                const pair = part.split("=")

                if (pair.length === 2)
                {
                    this.#cookieList.set(pair[0].trim(), new Cookie(pair[0].trim(), pair[1].trim()));
                }
            }
        }
    }
    
    setCookie(cookie: Cookie): void
    {
        if (this.#mode === CookieManagerMode.Document)
        {
            this.#cookieList.clear();

            document.cookie = cookie.toString();

            this.#appendCookieString(document.cookie)
        }

        else
        {
            if (!this.#cookieList.has(cookie.key) || this.#cookieList.get(cookie.key) !== cookie)
            {
                this.#cookieList.set(cookie.key, cookie);
                this.#cookiesToSet.set(cookie.key, cookie);
            }
        }
    }

    getCookie(key: string): Cookie | undefined
    {
        return this.#cookieList.get(key)
    }

    removeCookie(cookie: string | Cookie): void
    {
        const cookieKey: string = typeof(cookie) === "string"? cookie : cookie.key;

        if (this.#mode === CookieManagerMode.OnDemand)
        {
            if (this.#cookieList.has(cookieKey))
            {
                this.#cookieList.delete(cookieKey)
            }
    
            if (this.#cookiesToSet.has(cookieKey))
            {
                this.#cookiesToSet.delete(cookieKey)
            }
        }

        else
        {
            document.cookie = `${cookieKey}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
        }
        
    }

    getCookiesToSet(): IterableIterator<Cookie>
    {
        return this.#cookiesToSet.values();
    }
}

export { CookieManager }