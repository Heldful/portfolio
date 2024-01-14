"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Languages } from "@/config/i18n.config";

type Props = {
  locale: Languages;
};

export const LanguageToggle: React.FC<Props> = ({ locale }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isEnglish, setIsEnglish] = useState(locale === Languages.En);
  const [redirectTo, setRedirectTo] = useState<string | null>(null);

  useEffect(() => {
    setIsEnglish(locale === Languages.En);
  }, [locale]);

  useEffect(() => {
    if (redirectTo) {
      const timeoutId = setTimeout(() => {
        router.push(redirectTo);
      }, 150);

      return () => clearTimeout(timeoutId);
    }
  }, [redirectTo, router]);

  const toggleLanguage = useCallback(() => {
    const newLocale = isEnglish ? Languages.Esp : Languages.En;
    const newUrl =
      pathname?.replace(
        new RegExp(`^/${locale}(/|$)`, "i"),
        `/${newLocale}$1`
      ) ?? `/${newLocale}`;

    setRedirectTo(newUrl);

    // Start animation and set state
    setIsEnglish(!isEnglish);
  }, [pathname, isEnglish]);

  return (
    <div
      className="flex items-center duration-200 hover:cursor-pointer"
      onClick={toggleLanguage}
    >
      <span className="text-sm font-medium text-zinc-400 pr-2">ES</span>
      <div
        className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${
          isEnglish ? "bg-blue-500" : "bg-red-300"
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
            isEnglish ? "translate-x-6" : "translate-x-0"
          }`}
        ></div>
      </div>
      <span className="text-sm font-medium text-zinc-400 pl-2">EN</span>
    </div>
  );
};
