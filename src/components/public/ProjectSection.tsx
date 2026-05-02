"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { projectMocks } from "@/components/public/mock-data";
import { SectionLink } from "@/components/shared/SectionLink";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Montserrat, Playfair_Display } from "next/font/google"
import { cn } from "@/lib/utils"
import Image from "next/image";
import projectImage from "@/assets/images/projectimage.svg";
import imInfinity from "@/assets/images/infinity.svg";
import imFitness from "@/assets/images/fitness.svg";
import imParking from "@/assets/images/secure.svg";
import icInfinity from "@/assets/icons/infinity.svg";
import icFitness from "@/assets/icons/fitness.svg";
import icParking from "@/assets/icons/secure.svg";
import imMap from "@/assets/images/map.svg";


const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500"],
})



export function ProjectSection() {
  const project = projectMocks[0];
  const [selectedMap, setSelectedMap] = useState<"google" | "graphic">("google");
  const amenities = [
    { title: "Infinity Pool", icon: icInfinity, image: imInfinity },
    { title: "Fitness Center", icon: icFitness, image: imFitness },
    { title: "Secure Parking", icon: icParking, image: imParking },
  ];

  return (
    <section id="projects" className="scroll-mt-28 bg-zinc-50 px-4 py-14 sm:px-6 sm:py-16 dark:bg-[#111214] lg:px-10 lg:py-20">
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className={cn(playfair.className, "text-xs font-semibold uppercase tracking-[0.24em] text-[#b6924f]")}>Our Project</p>
          <h2 className={cn(playfair.className, "mt-3 text-4xl tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl md:text-6xl font-semibold leading-tight")}>Exceptional Projects</h2>
          <p className={cn(montserrat.className, "mx-auto mt-4 max-w-xl text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 sm:text-base")}>
            Elevated living in the heart of Vientiane
          </p>
        </motion.div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_1.1fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.4 }}
            className="space-y-3"
          >
            <div className="aspect-5/4 w-full rounded-sm border border-zinc-200 bg-linear-to-br from-zinc-200 via-zinc-100 to-zinc-300 overflow-hidden" >
              <Image src={projectImage} alt={project.name} width={500} height={500} className="w-full h-full object-cover " />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <p className={cn(playfair.className, "text-3xl font-semibold text-zinc-900 dark:text-zinc-100 leading-tight")}>Project location</p>
              <div className="inline-flex items-center rounded-full border border-zinc-300 bg-white p-0.5 dark:border-zinc-700 dark:bg-zinc-900">
                <Button
                  type="button"
                  size="sm"
                  onClick={() => setSelectedMap("google")}
                  className={
                    selectedMap === "google"
                      ? "h-7 rounded-full border border-zinc-500 bg-zinc-600 px-3 text-xs text-white hover:bg-zinc-600 dark:border-zinc-500 dark:bg-zinc-600"
                      : "h-7 rounded-full border border-transparent bg-transparent px-3 text-xs text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                  }
                >
                  Google Maps
                </Button>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => setSelectedMap("graphic")}
                  className={
                    selectedMap === "graphic"
                      ? "h-7 rounded-full border border-zinc-500 bg-zinc-600 px-3 text-xs text-white hover:bg-zinc-600 dark:border-zinc-500 dark:bg-zinc-600"
                      : "h-7 rounded-full border border-transparent bg-transparent px-3 text-xs text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                  }
                >
                  Graphic Map
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="space-y-5"
          >
            <div>
              <h3 className={cn(playfair.className, "text-3xl font-semibold text-zinc-900 dark:text-zinc-100")}>{project.name}</h3>
              <p className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-[#b6924f]">
                <MapPin className="h-4 w-4" />
                {project.location}
              </p>
              <p className={cn(montserrat.className, "mt-3 max-w-xl text-sm leading-relaxed text-zinc-500 dark:text-zinc-400")}>
                Minutes from Road 450 corridor, embassies, international schools, and premium shopping.
              </p>
            </div>

            <div className="relative mx-auto h-px max-w-xs md:max-w-md">
              <div
                className="absolute inset-0 opacity-90 "
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, #C5A059 50%, transparent 100%)",
                  boxShadow: "0 0 20px 1px rgba(197, 160, 89, 0.45)",
                }}
              />
            </div>


            <div>
              <p className={cn(playfair.className, "text-xl font-semibold text-zinc-900 dark:text-zinc-100")}>World-Class Amenities</p>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {amenities.map((amenity, index) => {
                  const Icon = amenity.icon;
                  return (
                    <motion.div
                      key={amenity.title}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.3, delay: 0.12 + index * 0.06 }}
                    >
                      <Card className="overflow-hidden rounded-sm border-[#d6c39b] bg-white shadow-none dark:bg-zinc-900">

                        <div className="h-28 bg-linear-to-br from-zinc-200 via-zinc-100 to-zinc-300" >
                          <Image src={amenity.image} alt={amenity.title} width={100} height={100} className="w-full h-full object-cover" />
                        </div>

                        <CardContent className="flex flex-col items-center justify-center gap-2 px-3 py-4 text-center">

                          <Image src={Icon} alt={amenity.title} width={8} height={8} className="h-12 w-20 object-cover" />

                          <span className="text-sm text-zinc-700 dark:text-zinc-200">{amenity.title}</span>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <Button
              asChild
              className={cn(
                playfair.className,
                `h-11 w-full rounded-sm border border-gold/40
     bg-linear-to-r from-[#c9a55c] via-[#dec089] to-[#f0e0bd]
     text-zinc-900 transition-all duration-300
     hover:bg-none hover:from-transparent hover:via-transparent hover:to-transparent
     hover:text-gold hover:border-gold`
              )}
            >
              <SectionLink sectionId="units">VIEW UNIT</SectionLink>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, delay: 0.12 }}
          className="mt-6"
        >
          
           
              {selectedMap === "google" ?
                <section className=" border-neutral-200 bg-white bg-red-500 w-full h-full">
                    <div className="relative mt-8 aspect-[21/9] min-h-[280px] w-full overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100 shadow-sm sm:min-h-[360px]">
                      <iframe
                        title="Google Maps"
                        className="absolute inset-0 h-full w-full border-0 grayscale-[20%]"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        src="https://maps.google.com/maps?q=Vientiane%2C+Laos&z=12&output=embed"
                      />
                      {/* <div
                        className={cn(
                          montserrat.className,
                          "absolute left-3 top-3 z-10 rounded-md border border-neutral-200 bg-white/95 px-3 py-2 text-xs font-medium shadow-sm backdrop-blur-sm sm:left-4 sm:top-4 sm:text-sm"
                        )}
                        style={{ color: HEADING }}
                      >
                        map label
                      </div> */}
                    </div>
                </section>

                : <section className="border-t border-neutral-200 bg-white bg-red-500 w-full h-full">
                    <Image src={imMap} alt="Map" width={1000} height={1000} className="w-full h-full object-cover" />
                  </section>
                  }
        </motion.div>
      </div>
    </section>
  );
}
