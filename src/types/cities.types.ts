import { Product } from "@/types/products.types";
import { StrapiMedia } from "@/types/utils.types";

export type City = {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  thumbnail: StrapiMedia;
  products: Product[];
  order: number;
};
