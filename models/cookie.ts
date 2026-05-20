export class Cookie {
    key: string;
    value: string;
    expires: Date | undefined;
    path: string | undefined;

    constructor(key: string, value: string, expires: Date | undefined = undefined, path: string | undefined = undefined)
    {
        this.key = key;
        this.value = value;
        this.expires = expires;
        this.path = path;
    }

    toString(): string {
        let cookieString = `${this.key}=${this.value}`

        if (typeof(this.expires) !== "undefined")
        {
            cookieString +=`;expires=${this.expires.toUTCString()}`;
        }

        if (typeof(this.path) !== "undefined")
        {
            cookieString +=`;path=${this.path}`;
        }

        return cookieString;
    }
}