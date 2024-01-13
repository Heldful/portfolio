import { Languages } from "@/config/i18n.config";
import { unstable_setRequestLocale } from "next-intl/server";

export default function ProjectsLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: {
    locale: Languages;
  };
}) {
  unstable_setRequestLocale(locale);
  return (
    <div className="relative min-h-screen bg-gradient-to-tl from-zinc-900 via-zinc-400/10 to-zinc-900 ">
      {children}
    </div>
  );
}
