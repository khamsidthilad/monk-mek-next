"use client";

import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Playfair_Display } from "next/font/google";
import { cn } from "@/lib/utils"
import imDetail from "@/assets/images/detail.svg";
import Image from "next/image";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
})

const THUMBNAIL_SLIDES = Array.from({ length: 10 }, (_, i) => i + 1);

export function UnitThumbnailCarousel() {
  const [selectedIndex, setSelectedIndex] = useState(1);

  return (
    <div className="w-full">

      {/* Main Preview */}
      <div className={cn(playfair.className, "h-full w-full rounded-md border border-zinc-200 bg-linear-to-br from-zinc-200 via-zinc-100 to-zinc-300 overflow-hidden")}>
        <Image src={imDetail} alt="Thumbnail" width={1000} height={1000} className="w-full h-full object-cover" />
      </div>

      {/* Thumbnails */}
      <div className="mt-3">
        <Carousel
          opts={{ align: "start", containScroll: "trimSnaps" }}
          className="w-full"
        >
          <CarouselContent className="-ml-2">

            {THUMBNAIL_SLIDES.map((slide) => {
              const active = selectedIndex === slide;

              return (
                <CarouselItem
                  key={slide}
                  className="basis-1/3 pl-2 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 xl:basis-1/8"
                >
                  <button
                    onClick={() => setSelectedIndex(slide)}
                    className={cn(playfair.className, `flex h-14 w-full items-center justify-center rounded-sm border text-xs font-semibold uppercase transition sm:h-16 ${
                      active
                        ? "border-[#b99655] bg-[#f4ead5] text-[#8c7239] overflow-hidden"
                        : "border-zinc-200 bg-linear-to-br from-zinc-100 via-zinc-50 to-zinc-200 text-zinc-500 hover:border-zinc-300 overflow-hidden opacity-70"
                    }`)}
                  >
                    <Image src={imDetail} alt="Thumbnail" width={1000} height={1000} className="w-full h-full object-cover" />
                    <span className={cn(playfair.className, "sr-only")}>
                      {slide}
                    </span>
                  </button>
                </CarouselItem>
              );
            })}

          </CarouselContent>

          {/* Mobile arrows */}
          <CarouselPrevious className={cn(playfair.className, "left-1 top-1/2 size-7 -translate-y-1/2 bg-white/90 sm:hidden")} />
          <CarouselNext className={cn(playfair.className, "right-1 top-1/2 size-7 -translate-y-1/2 bg-white/90 sm:hidden")} />
        </Carousel>
      </div>
    </div>
  );
}