import Image from "next/image";
import Link from "next/link";

import PageTitle from "@/components/page-title";
import apiRequests from "@/lib/apiRequests";
import {
  generateNameId,
  getFullMediaURL,
  getPlainTextFromBlocksContent,
} from "@/lib/utils";

export default async function PostsPage() {
  const posts = await apiRequests.posts({});

  if (!posts) return null;

  return (
    <div className="space-y-6">
      <PageTitle
        title="Bài viết"
        description={`Hiện có ${posts.meta.pagination?.total ?? 0} bài viết`}
      />
      <div className="container">
        <div className="grid grid-cols-12 gap-4">
          {posts.data.map((post) => (
            <div
              key={post.id}
              className="col-span-12 md:col-span-6 lg:col-span-4"
            >
              <div className="group">
                <Link
                  href={`/bai-viet/${generateNameId({
                    name: post.title,
                    id: post.documentId,
                  })}`}
                  className="outline-hidden"
                >
                  <Image
                    src={getFullMediaURL(post.thumbnail.url)}
                    alt={post.title}
                    width={post.thumbnail.width}
                    height={post.thumbnail.height}
                    className="object-cover w-full aspect-video rounded-t-lg"
                  />
                </Link>
                <div className="p-4 rounded-b-lg bg-muted space-y-2">
                  <Link
                    href={`/bai-viet/${generateNameId({
                      name: post.title,
                      id: post.documentId,
                    })}`}
                    className="font-semibold block duration-150 group-hover:text-destructive"
                  >
                    {post.title}
                  </Link>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {getPlainTextFromBlocksContent(post.content)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
