"use client";

import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useFancybox from "@/hooks/useFancybox";
import { getFullMediaURL } from "@/lib/utils";
import { StrapiMedia } from "@/types/utils.types";

export default function GalleryImages({ photos }: { photos: StrapiMedia[] }) {
  const [fancyboxRef] = useFancybox();
  return (
    <div ref={fancyboxRef}>
      <Carousel className="mt-0 md:mt-4">
        <CarouselContent>
          {photos.map((photo) => (
            <CarouselItem
              key={photo.id}
              className="basis-full md:basis-1/2 lg:basis-1/3"
            >
              <a data-fancybox="gallery" href={getFullMediaURL(photo.url)}>
                <Image
                  width={500}
                  height={500}
                  src={getFullMediaURL(photo.url)}
                  alt={photo.alternativeText ?? ""}
                  className="rounded-none md:rounded-md object-cover w-full aspect-square"
                />
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-1" />
        <CarouselNext className="right-1" />
      </Carousel>
    </div>
  );
}
