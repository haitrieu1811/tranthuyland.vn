import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import BlocksRendererClient from "@/components/blocks-renderer-client";
import apiRequests from "@/lib/apiRequests";
import { getFullMediaURL, getPlainTextFromBlocksContent } from "@/lib/utils";
import { generateNameId, getIdFromNameId } from "@/lib/utils";

type Props = {
  params: Promise<{ nameId: string }>;
};

const getPostData = async (id: string) => {
  const post = await apiRequests.post(id);
  return post;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { nameId } = await params;
  const id = getIdFromNameId(nameId);
  const post = await getPostData(id);
  if (!post) return notFound();
  const { title, content } = post;
  return {
    title,
    description: getPlainTextFromBlocksContent(content).slice(0, 160),
    openGraph: {
      title,
      images: [getFullMediaURL(post.thumbnail.url)],
      description: getPlainTextFromBlocksContent(content).slice(0, 160),
      type: "article",
    },
  };
}

export default async function PostDetailPage({ params }: Props) {
  const { nameId } = await params;
  const id = getIdFromNameId(nameId);
  const [post, relatedPosts] = await Promise.all([
    getPostData(id),
    apiRequests.posts({
      filters: [["documentId", "$ne", id]],
    }),
  ]);
  if (!post || !relatedPosts) return notFound();

  return (
    <div className="pt-10">
      <Image
        src={getFullMediaURL(post.thumbnail.url)}
        alt={post.title}
        width={post.thumbnail.width}
        height={post.thumbnail.height}
        className="mx-auto mb-10 w-[90vw] lg:w-[500px] object-contain rounded-lg"
      />
      <h1 className="text-3xl font-semibold text-center tracking-tight leading-snug mb-10">
        {post.title}
      </h1>
      <div className="container">
        <BlocksRendererClient content={post.content} />
        <div className="mt-20">
          <h3 className="font-semibold tracking-tight text-xl">Xem thêm:</h3>
          <ul className="mt-4 space-y-2">
            {relatedPosts.data.map((post) => (
              <li key={post.id}>
                <Link
                  href={`/bai-viet/${generateNameId({
                    id: post.documentId,
                    name: post.title,
                  })}`}
                  className="text-blue-500 font-medium hover:underline leading-loose"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
