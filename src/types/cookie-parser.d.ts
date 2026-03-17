declare module "cookie-parser" {
  import { RequestHandler } from "express";

  interface CookieParseOptions {
    decode?(value: string): string;
  }

  interface CookieParser {
    (secret?: string | string[], options?: CookieParseOptions): RequestHandler;
    JSONCookie(jsonCookie: string): object | undefined;
    JSONCookies<T extends Record<string, unknown>>(obj: T): T;
    signedCookie(cookie: string, secret: string | string[]): string | false;
    signedCookies<T extends Record<string, unknown>>(
      obj: T,
      secret: string | string[]
    ): T;
  }

  const cookieParser: CookieParser;
  export default cookieParser;
}
