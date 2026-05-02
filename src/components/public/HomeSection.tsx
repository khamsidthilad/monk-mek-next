"use client";

import { motion } from "framer-motion";
import { SectionLink } from "@/components/shared/SectionLink";
import { Button } from "@/components/ui/button";
import { Montserrat, Playfair_Display } from "next/font/google"
import { cn } from "@/lib/utils"
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500"],
})

export function HomeSection() {
  return (
    <section
      id="home"
      className="scroll-mt-28 relative left-1/2 right-1/2 -mt-24 mx-[-50vw] min-h-svh w-screen overflow-hidden"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover object-[62%_center] sm:object-center"
        src="/video_hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
      />
      <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-6xl flex-col items-center justify-center px-4 pt-20 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="flex w-full max-w-4xl flex-col items-center space-y-5 sm:space-y-6"
        >
          <p className={cn(montserrat.className, "inline-flex items-center gap-2 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white sm:text-[11px]")}>
            ICON LAOS PRESENTS
          </p>
          <h1 className={cn(playfair.className, "max-w-3xl text-3xl font-semibold leading-[1.1] text-white sm:text-5xl lg:text-6xl")}>
            A New Landmark of
            <br />
            Vientiane
          </h1>
          <p className={cn(montserrat.className, "max-w-sm text-sm leading-relaxed text-zinc-100/95 sm:max-w-xl sm:text-base")}>
            Premium living meets exceptional investment - where modern luxury and 7% annual returns converge.
          </p>
          <div className="flex w-full max-w-md flex-col items-center justify-center gap-3 sm:max-w-none sm:flex-row">
            <Button
              asChild
              variant="outline"
              className={cn(playfair.className, "h-10 w-full gap-2 uppercase rounded-md bg-linear-to-r from-[#bf974c] to-[#e4dfd4] hover:bg-none hover:text-gold text-black hover:bg-transparent  sm:w-auto sm:px-7")}
            >
              <SectionLink sectionId="units">View Unit</SectionLink>
            </Button>
            <Button
                variant="outline"
                className={cn(playfair.className, "h-10 w-full gap-2 cursor-pointer uppercase rounded-md bg-linear-to-r from-[#e4dfd4] to-[#bf974c] hover:bg-none hover:text-gold text-black hover:bg-transparent sm:w-auto sm:px-7")}
            >
              BOOK A VISIT
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
