"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Playfair_Display, Montserrat } from "next/font/google";
import { cn } from "@/lib/utils"
import imGallery from "@/assets/images/projectimage.svg";
import Image from "next/image";


const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500"],
})

export function GallerySection() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [activeSlide, setActiveSlide] = useState(0);
  const thumbnailSlides = Array.from({ length: 4 });
  const progress = [
    { year: "2025", label: "Foundation Complete", active: true },
    { year: "2026", label: "Structure Complete", active: true },
    { year: "2027", label: "Interior Finishing", active: false },
    { year: "2028", label: "Handover", active: false },
  ] as const;

  useEffect(() => {
    if (!carouselApi) return;

    const onSelect = () => {
      setActiveSlide(carouselApi.selectedScrollSnap());
    };

    onSelect();
    carouselApi.on("select", onSelect);
    carouselApi.on("reInit", onSelect);

    return () => {
      carouselApi.off("select", onSelect);
      carouselApi.off("reInit", onSelect);
    };
  }, [carouselApi]);

  return (
    <section id="gallery" className="scroll-mt-28 bg-white px-4 py-14 text-zinc-900 sm:px-6 sm:py-16 dark:bg-black dark:text-white lg:px-10 lg:py-20">
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.35 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className={cn(playfair.className, "text-xs font-semibold uppercase tracking-[0.24em] text-gold")}>Gallery</p>
          <h2 className={cn(playfair.className, "mt-3 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl")}>Experience the Vision</h2>
          <p className={cn(montserrat.className, "mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 sm:text-base")}>
            Discover the art of refined hospitality through every frame. Each image reflects thoughtful design, elegant
            details, and a premium experience crafted to elevate your stay.
          </p>
        </motion.div>
      </div>

      <div className="mx-auto mt-10 grid w-full max-w-6xl gap-4 lg:grid-cols-[1.25fr_0.75fr] lg:items-stretch lg:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35 }}
        >
          <div className="aspect-5/5 w-full rounded-sm bg-linear-to-br from-zinc-200 via-zinc-100 to-zinc-300 overflow-hidden" >
            <Image src={imGallery} alt="Gallery" width={1000} height={1000} className="w-full h-full object-cover" />
          </div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35, delay: 0.08 }}
          className="flex h-full flex-col rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-white/10 dark:bg-white/3 lg:p-7"
        >
          <h3 className={cn(playfair.className, "text-[26px] font-semibold text-zinc-900 dark:text-zinc-200")}>Construction Progress</h3>
          <div className="relative mt-6 flex-1">
            <div className="absolute bottom-2 left-1/2 top-2 w-px -translate-x-1/2 bg-zinc-300 dark:bg-zinc-500" />
            <div className="flex h-full min-h-88 flex-col justify-between">
              {progress.map((item, index) => {
                const isLeft = index % 2 !== 0;
                return (
                  <div key={`${item.year}-${item.label}`} className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                    <div className={isLeft ? "text-right" : "opacity-0"} aria-hidden={!isLeft}>
                      <p className={cn(playfair.className, `text-3xl font-semibold ${item.active ? "text-gold" : "text-zinc-800 dark:text-zinc-200"}`)}>{item.year}</p>
                      <p className={cn(montserrat.className, "text-lg text-zinc-500 dark:text-zinc-400")}>{item.label}</p>
                    </div>

                    <span
                      className={cn(playfair.className, `z-10 block h-5 w-5 rounded-full border ${
                        item.active ? "border-gold bg-gold/90" : "border-zinc-400 bg-white dark:bg-black"
                      }`)}
                    />

                    <div className={!isLeft ? "text-left" : "opacity-0"} aria-hidden={isLeft}>
                      <p className={cn(playfair.className, `text-3xl font-semibold ${item.active ? "text-gold" : "text-zinc-800 dark:text-zinc-200"}`)}>{item.year}</p>
                      <p className={cn(montserrat.className, "text-lg text-zinc-500 dark:text-zinc-400")}>{item.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.aside>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.3 }}
        className="mx-auto mt-4 w-full max-w-6xl"
      >
        <Carousel
          setApi={setCarouselApi}
          opts={{ align: "start", loop: true }}
          className="w-full"
        >
          <CarouselContent className="-ml-3">
            {thumbnailSlides.map((_, slideIndex) => (
              <CarouselItem key={slideIndex} className="basis-full pl-3">
                <div className="grid w-full grid-cols-3 gap-3">
                  {Array.from({ length: 3 }).map((__, thumbIndex) => (
                    <div
                      key={`${slideIndex}-${thumbIndex}`}
                      className="h-40 w-full rounded-sm bg-linear-to-br from-zinc-200 via-zinc-100 to-zinc-300 sm:h-52 lg:h-72 overflow-hidden"
                    >
                      <Image src={imGallery} alt="Gallery" width={1000} height={1000} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </motion.div>

      <div className="mx-auto mt-6 flex w-full max-w-6xl justify-center">
        <div className="inline-flex items-center gap-2">
          {thumbnailSlides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => carouselApi?.scrollTo(index)}
              className={cn(playfair.className, index === activeSlide ? "h-2 w-7 rounded-full bg-gold" : "h-2 w-2 rounded-full bg-zinc-500")}
              aria-label={`Go to gallery slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
