import { type BlocksContent } from "@strapi/blocks-react-renderer";

import { StrapiMedia } from "@/types/utils.types";

export type Product = {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  name: string;
  price: string;
  acreage: number;
  totalBedrooms: null | number;
  specificAddress: string;
  totalToilets: null | number;
  description: BlocksContent;
  thumbnail: StrapiMedia;
  photos: StrapiMedia[] | null;
  isFeatured: boolean;
  city: {
    id: number;
    documentId: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  } | null;
};
