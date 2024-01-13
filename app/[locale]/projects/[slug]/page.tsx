import { notFound } from "next/navigation";
import { allProjects } from "contentlayer/generated";
import { Mdx } from "@/app/[locale]/components/mdx";
import { Header } from "./header";
import "./mdx.css";
import { ReportView } from "./view";
import { Redis } from "@upstash/redis";
import { getRoutesForLocale } from "@/config/routes.config";
import { Languages } from "@/config/i18n.config";
import { unstable_setRequestLocale } from "next-intl/server";

export const revalidate = 60;

export const dynamic = "force-dynamic";

type Props = {
  params: {
    slug: string;
    locale: Languages;
  };
};

const redis = Redis.fromEnv();

export async function generateStaticParams() {
  const locales = Object.values(Languages);

  return locales.map((locale) => {
    const localizedProjects = allProjects.filter((project) =>
      project._raw.sourceFilePath.startsWith(`${locale}/projects/`)
    );
    return localizedProjects
      .filter((p) => p.published)
      .map((p) => ({
        locale,
        slug: `${getRoutesForLocale(locale).Projects}/${p.slug}`,
      }));
  });
}

export default async function PostPage({ params: { slug, locale } }: Props) {
  unstable_setRequestLocale(locale);
  const localizedProjects = allProjects.filter((project) =>
    project._raw.sourceFilePath.startsWith(`${locale}/projects/`)
  );

  const project = localizedProjects.find((project) => project.slug === slug);

  if (!project) {
    notFound();
  }

  const views =
    (await redis.get<number>(["pageviews", "projects", slug].join(":"))) ?? 0;

  return (
    <div className="bg-zinc-50 min-h-screen">
      <Header project={project} views={views} locale={locale} />
      <ReportView slug={project.slug} />

      <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
        <Mdx code={project.body.code} />
      </article>
    </div>
  );
}
