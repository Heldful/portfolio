import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { Languages } from "./config/i18n.config";

const locales = Object.values(Languages);

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as Languages)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
