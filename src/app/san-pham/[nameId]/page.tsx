/* eslint-disable @typescript-eslint/no-explicit-any */
import { convert } from "html-to-text";
import { Bed, MapPin, Toilet } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import ProductItem from "@/components/product-item";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  formatLargeNumber,
  formatProduct,
  getIdFromNameId,
  getOneEntry,
} from "@/lib/utils";
import Prose from "@/components/prose";

const { Products } = getOneEntry();

type Props = {
  params: Promise<{ nameId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { nameId } = await params;
  const id = getIdFromNameId(nameId);
  const productInfo = await Products.getProductById(Number(id)).catch(
    () => null
  );
  const product = formatProduct(productInfo);
  if (!product) return notFound();
  return {
    title: product.title,
    description: convert(product.description).slice(0, 160),
    openGraph: {
      title: product.title,
      images: [product.thumbnail],
      description: convert(product.description).slice(0, 160),
      type: "article",
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { nameId } = await params;
  const id = getIdFromNameId(nameId);
  const [productInfo, productsInfo] = await Promise.all([
    Products.getProductById(Number(id)).catch(() => null),
    Products.getProductsByPageUrl("san-pham"),
  ]);
  const product = formatProduct(productInfo);
  const relatedProducts = productsInfo.items.map((item: any) =>
    formatProduct(item)
  );
  if (!product || !relatedProducts) return notFound();

  return (
    <div className="w-[90vw] md:w-[80vw] mx-auto pt-4 pb-10 space-y-10">
      <Carousel>
        <CarouselContent>
          {product.photos.map((photo) => (
            <CarouselItem
              key={photo}
              className="basis-full md:basis-1/2 lg:basis-1/3"
            >
              <a href={photo} target="_blank">
                <Image
                  width={500}
                  height={500}
                  src={photo}
                  alt={photo}
                  className="rounded-md object-cover w-full aspect-square"
                />
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-1" />
        <CarouselNext className="right-1" />
      </Carousel>
      <div className="space-y-4">
        <h1 className="font-medium text-2xl">{product.title}</h1>
        <div className="flex items-center space-x-2 text-muted-foreground">
          <MapPin className="stroke-1" />
          <span>{product.address}</span>
        </div>
        <div className="flex flex-wrap items-center space-x-4">
          <div className="font-semibold text-destructive text-2xl">
            {formatLargeNumber(product.price)}
          </div>
          <div className="size-1 aspect-square rounded-full bg-black" />
          <div className="text-xl">
            {product.acreage}m<sup>2</sup>
          </div>
          <div className="size-1 aspect-square rounded-full bg-black" />
          <div className="text-xl text-muted-foreground">
            {formatLargeNumber(product.price / product.acreage)}/m
            <sup>2</sup>
          </div>
        </div>
        <div className="flex flex-wrap items-center space-x-4">
          {product.totalBedrooms && (
            <Button variant="outline" className="rounded-full">
              <Bed />
              {product.totalBedrooms} phòng ngủ
            </Button>
          )}
          {product.totalToilets && (
            <Button variant="outline" className="rounded-full">
              <Toilet />
              {product.totalToilets} nhà vệ sinh
            </Button>
          )}
        </div>
        <Prose html={product.description} />
      </div>
      {/* Gợi ý liên quan */}
      <div className="space-y-4">
        <h3 className="font-semibold text-xl">Gợi ý liên quan</h3>
        <div className="grid grid-cols-12 gap-4">
          {relatedProducts
            .filter((item: any) => item.id !== product.id)
            .slice(0, 3)
            .map((product: any) => (
              <div
                key={product.id}
                className="col-span-12 md:col-span-6 lg:col-span-4"
              >
                <ProductItem product={product} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
