"use client";

import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const images = [
  "https://batdongsan11.com/wp-content/uploads/2023/03/z4169611387702_0b0b0d363861592bb1d40d62f41ddd6e.jpg",
  "https://batdongsan11.com/wp-content/uploads/2023/03/Hinh-web.jpg",
] as const;

export default function HomeCarousel() {
  return (
    <Carousel
      opts={{
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
    >
      <CarouselContent>
        {images.map((image) => (
          <CarouselItem
            key={image}
            className="relative after:absolute after:inset-0 after:bg-[#69482e]/50 after:mix-blend-multiply"
          >
            <Image
              width={500}
              height={500}
              src={image}
              alt={image}
              className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover"
            />
            <div className="absolute inset-0 z-10">
              <div className="flex h-full justify-center items-center">
                <div className="text-white text-[30px] md:text-[40px] text-center p-10">
                  <h2 className="capitalize font-light">Trần Thủy Land</h2>
                  <p className="font-bold uppercase">
                    Trao niềm tin và giá trị đến bạn
                  </p>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
