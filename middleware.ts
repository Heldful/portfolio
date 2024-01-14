import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { Languages } from "./config/i18n.config";

// Define the default and supported locales
const defaultLocale = Languages.En;
const supportedLocales = Object.values(Languages);

// Create the next-intl middleware
const nextIntlMiddleware = createMiddleware({
  locales: supportedLocales,
  defaultLocale,
});

export default function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Check if the URL already has a supported locale
  const pathnameHasLocale = supportedLocales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale && pathname === "/") {
    // Redirect to the URL with the default locale
    const url = req.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  // Continue with the next-intl middleware processing
  return nextIntlMiddleware(req);
}

export const config = {
  matcher: ["/", "/(esp|en)/:path*"],
};
