"use client";

import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer";
import Image from "next/image";

export default function BlocksRendererClient({
  content,
}: {
  content: BlocksContent;
}) {
  return (
    <BlocksRenderer
      content={content}
      blocks={{
        image: ({ image }) => (
          <Image
            src={image.url}
            width={image.width || 800}
            height={image.height || 600}
            alt={image.alternativeText || "Image"}
            className="rounded-lg object-cover mx-auto"
          />
        ),
        paragraph: ({ children }) => (
          <p className="my-4 text-justify leading-7">{children}</p>
        ),
      }}
      modifiers={{
        bold: ({ children }) => (
          <strong className="font-semibold">{children}</strong>
        ),
      }}
    />
  );
}
