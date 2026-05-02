"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Montserrat } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import { cn } from "@/lib/utils"

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500"],
})


export function ContactUsSection() {
  return (
    <section id="contact" className="scroll-mt-28 bg-black px-4 py-14 text-white sm:px-6 sm:py-16 lg:px-10 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4 }}
        className="mx-auto w-full max-w-6xl"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2 className={cn(playfair.className, "text-3xl font-semibold tracking-tight text-zinc-100 sm:text-5xl")}>Begin Your Journey</h2>
          <p className={cn(montserrat.className, "mx-auto mt-3 max-w-2xl text-sm text-zinc-400 sm:text-lg")}>
            Get exclusive access to pricing, floor plans, and investment packages.
          </p>
        </div>

        <form className="mx-auto mt-8 w-full max-w-5xl space-y-4">
          <Input
            placeholder="Name and surname"
            className={cn(playfair.className, "h-14 rounded-sm border-zinc-700 bg-black text-zinc-100 placeholder:text-zinc-500")}
          />
          <Input
            placeholder="Number Phone or Email"
            className={cn(playfair.className, "h-14 rounded-sm border-zinc-700 bg-black text-zinc-100 placeholder:text-zinc-500")}
          />
          <Button className={cn(playfair.className, "h-14 w-full gap-2 rounded-sm bg-linear-to-r from-[#bf974c] to-[#d8b56d] text-base font-semibold text-zinc-100 hover:opacity-90")}>
            <Send className={cn(playfair.className, "h-4 w-4")} />
            Sent
          </Button>
        </form>
      </motion.div>
    </section>
  );
}
