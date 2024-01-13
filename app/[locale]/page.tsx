import Link from "next/link";
import React from "react";
import Particles from "./components/particles";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { getRoutesForLocale } from "@/config/routes.config";
import { Languages } from "@/config/i18n.config";

export default function Home({
  params: { locale },
}: {
  params: { locale: Languages };
}) {
  unstable_setRequestLocale(locale);

  const t = useTranslations("Home");

  // Get the correct routes based on the locale
  const localizedRoutes = getRoutesForLocale(locale);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      <nav className="my-16 animate-fade-in">
        <ul className="flex items-center justify-center gap-4">
          <Link
            href={localizedRoutes.Projects}
            className="text-sm duration-500 text-zinc-500 hover:text-zinc-300"
          >
            {t("projects")}
          </Link>
          <Link
            href={localizedRoutes.Contact}
            className="text-sm duration-500 text-zinc-500 hover:text-zinc-300"
          >
            {t("contact")}
          </Link>
        </ul>
      </nav>
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      <h1 className="z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text ">
        {t("name")}
      </h1>

      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <div className="my-16 text-center animate-fade-in">
        <h2 className="text-sm text-zinc-500 ">{t("description")}</h2>
      </div>
    </div>
  );
}
