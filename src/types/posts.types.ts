import { type BlocksContent } from "@strapi/blocks-react-renderer";

import { StrapiMedia } from "@/types/utils.types";

export type Post = {
  id: number;
  documentId: string;
  title: string;
  thumbnail: StrapiMedia;
  content: BlocksContent;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};
