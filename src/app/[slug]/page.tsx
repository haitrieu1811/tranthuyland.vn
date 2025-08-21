import { htmlToText } from "html-to-text";
import { notFound } from "next/navigation";
import { Metadata } from "next";

import Prose from "@/components/prose";
import { getOneEntry } from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pageInfo = await Pages.getPageByUrl(slug).catch(() => null);
  if (!pageInfo) return notFound();

  return {
    title: pageInfo.localizeInfos.title,
    description: htmlToText(pageInfo.localizeInfos.htmlContent).slice(0, 160),
    openGraph: {
      title: pageInfo.localizeInfos.title,
      description: htmlToText(pageInfo.localizeInfos.htmlContent).slice(0, 160),
    },
  };
}

const { Pages } = getOneEntry();
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const pageInfo = await Pages.getPageByUrl(slug).catch(() => null);
  if (!pageInfo) return null;

  return (
    <div className="py-10">
      <div className="w-[90vw] md:w-[80vw] mx-auto">
        <Prose html={pageInfo.localizeInfos.htmlContent} />
      </div>
    </div>
  );
}
