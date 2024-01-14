"use client";
import { Languages } from "@/config/i18n.config";
import { getRoutesForLocale } from "@/config/routes.config";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { LanguageToggle } from "./languageToggle";

type Links = {
  projects: string;
  contact: string;
  home: string;
};

type Props = {
  locale: Languages;
  links: Links;
};

export const Navigation: React.FC<Props> = ({ locale, links }: Props) => {
  const routes = getRoutesForLocale(locale);

  const ref = useRef<HTMLElement>(null);
  const [isIntersecting, setIntersecting] = useState(true);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <header ref={ref}>
      <div
        className={`fixed inset-x-0 top-0 z-50 backdrop-blur  duration-200 border-b  ${
          isIntersecting
            ? "bg-zinc-900/0 border-transparent"
            : "bg-zinc-900/500  border-zinc-800 "
        }`}
      >
        <div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
          <div className="flex justify-between gap-8">
            <Link
              href={routes.Projects}
              className="duration-200 text-zinc-400 hover:text-zinc-100"
            >
              {links.projects}
            </Link>
            <Link
              href={routes.Contact}
              className="duration-200 text-zinc-400 hover:text-zinc-100"
            >
              {links.contact}
            </Link>
            <LanguageToggle locale={locale} />
          </div>

          <Link
            href={routes.Home}
            className="duration-200 text-zinc-300 hover:text-zinc-100"
          >
            <ArrowLeft className="w-6 h-6 " />
          </Link>
        </div>
      </div>
    </header>
  );
};
