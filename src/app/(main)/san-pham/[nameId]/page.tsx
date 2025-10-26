import { Bed, MapPin, Toilet } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

import BlocksRendererClient from "@/components/blocks-renderer-client";
import ProductCarousel from "@/components/product-carousel";
import ProductItem from "@/components/product-item";
import apiRequests from "@/lib/apiRequests";
import {
  formatMoneyToWords,
  getFullMediaURL,
  getIdFromNameId,
  getPlainTextFromBlocksContent,
} from "@/lib/utils";

type Props = {
  params: Promise<{ nameId: string }>;
};

const getProductData = async (id: string) => {
  const product = await apiRequests.product(id);
  return product;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { nameId } = await params;
  const id = getIdFromNameId(nameId);
  const product = await getProductData(id).catch(() => null);
  if (!product) return notFound();
  const { name: title, description, thumbnail } = product;
  return {
    title,
    description: getPlainTextFromBlocksContent(description).slice(0, 160),
    openGraph: {
      title,
      images: [getFullMediaURL(thumbnail.url)],
      description: getPlainTextFromBlocksContent(description).slice(0, 160),
      type: "article",
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { nameId } = await params;
  const id = getIdFromNameId(nameId);
  const [product, relatedProducts] = await Promise.all([
    getProductData(id).catch(() => null),
    apiRequests.products({
      filters: [["documentId", "$ne", id]],
      limit: 4,
    }),
  ]);

  if (!product || !relatedProducts) return notFound();

  return (
    <div className="container mt-4">
      <div className="grid grid-cols-12 gap-4 md:gap-10">
        <div className="col-span-12 lg:col-span-8 space-y-4">
          {product.photos && product.photos.length > 0 && (
            <ProductCarousel
              images={product.photos.map((photo) => photo.url)}
            />
          )}
          <h1 className="font-semibold text-2xl">{product.name}</h1>
          {product.specificAddress && (
            <div className="flex items-center space-x-2">
              <MapPin className="stroke-1" />
              <span>{product.specificAddress}</span>
            </div>
          )}
          <div className="flex flex-wrap items-center space-x-4">
            <div className="font-semibold text-destructive text-2xl">
              {formatMoneyToWords(Number(product.price))}
            </div>
            {product.acreage && (
              <React.Fragment>
                <div className="size-1 aspect-square rounded-full bg-black" />
                <div className="text-xl">
                  {product.acreage}m<sup>2</sup>
                </div>
              </React.Fragment>
            )}
            {product.acreage && (
              <React.Fragment>
                <div className="size-1 aspect-square rounded-full bg-black" />
                <div className="text-xl text-muted-foreground">
                  {formatMoneyToWords(Number(product.price) / product.acreage)}
                  /m
                  <sup>2</sup>
                </div>
              </React.Fragment>
            )}
          </div>
          <div className="flex flex-wrap items-center space-x-4">
            {product.totalBedrooms && (
              <div className="flex items-center space-x-2 bg-muted rounded-lg p-2">
                <Bed className="stroke-[1.5]" />
                <span className="font-medium">
                  {product.totalBedrooms} phòng ngủ
                </span>
              </div>
            )}
            {product.totalToilets && (
              <div className="flex items-center space-x-2 bg-muted rounded-lg p-2">
                <Toilet className="stroke-[1.5]" />
                <span className="font-medium">
                  {product.totalToilets} nhà vệ sinh
                </span>
              </div>
            )}
          </div>
          {product.description && (
            <BlocksRendererClient content={product.description} />
          )}
        </div>
        {/* Gợi ý liên quan */}
        <div className="col-span-12 lg:col-span-4 space-y-4">
          <h3 className="font-semibold text-xl">Gợi ý liên quan</h3>
          {relatedProducts.data.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
