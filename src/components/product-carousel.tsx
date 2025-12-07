"use client";

import { Fancybox } from "@fancyapps/ui";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";

import useFancybox from "@/hooks/useFancybox";
import { getFullMediaURL } from "@/lib/utils";

interface ProductCarouselProps {
  images: string[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({ loop: false });
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  // Cập nhật ảnh đang active
  const onSelect = useCallback(() => {
    if (!emblaMainApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi?.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi]);

  // Khi click vào thumbnail
  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect);
    emblaMainApi.on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  const [fancyboxRef] = useFancybox({});

  const openGallery = (index: number) => {
    const imagesData = images.map((image) => ({
      src: getFullMediaURL(image),
      type: "image",
      caption: image,
    }));
    Fancybox.show(imagesData, {
      startIndex: index, // bắt đầu mở tại ảnh thứ mấy
    });
  };

  return (
    <div className="w-full" ref={fancyboxRef}>
      {/* Carousel chính */}
      <div
        className="overflow-hidden rounded-2xl h-[200px] md:h-[300px] lg:h-[500px]"
        ref={emblaMainRef}
      >
        <div className="flex">
          {images.map((src, index) => (
            <div key={index} className="flex-[0_0_100%]">
              <Image
                src={getFullMediaURL(src)}
                alt={`Product ${index}`}
                width={800}
                height={600}
                className="size-full object-cover"
                priority={index === 0}
                onClick={() => openGallery(selectedIndex)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="overflow-hidden mt-4" ref={emblaThumbsRef}>
        <div className="flex gap-3">
          {images.map((src, index) => (
            <button
              key={index}
              onClick={() => onThumbClick(index)}
              className={`flex-[0_0_auto] relative border-2 rounded-xl overflow-hidden transition-all duration-200 ${
                index === selectedIndex
                  ? "border-blue-500 scale-105"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={getFullMediaURL(src)}
                alt={`Thumbnail ${index}`}
                width={100}
                height={80}
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
