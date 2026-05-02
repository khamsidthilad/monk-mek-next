"use client";

import { motion } from "framer-motion";
import { Montserrat, Playfair_Display } from "next/font/google"
import { cn } from "@/lib/utils"
import imBelowRegionalIcon from "@/assets/icons/below.svg"
import imAnnualIcon from "@/assets/icons/annual.svg"
import imLoanToValueIcon from "@/assets/icons/loan.svg"
import imCompletionIcon from "@/assets/icons/completion.svg"
import Image from "next/image";
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500"],
})
const stats = [
  {
    icon: imAnnualIcon,
    value: "7%",
    label: "Annual Yield",
  },
  {
    icon: imBelowRegionalIcon,
    value: "58%",
    label: "Below Regional",
  },
  {
    icon: imLoanToValueIcon,
    value: "70%",
    label: "Loan-to-Value",
  },
  {
    icon: imCompletionIcon,
    value: "2027",
    label: "Completion",
  },
];

const GOLD = "#C5A059"
// const MUTED = "#A1A1A1"
// const BG = "#1A1A1A"

export function AboutUsSection() {
  return (
    <section
      id="about-us"
      className="relative left-1/2 right-1/2 mx-[-50vw] w-screen scroll-mt-28 bg-[#25262B] px-4 py-14 text-white sm:px-6 sm:py-16 lg:px-10 lg:py-20"
    >
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className={cn(
            montserrat.className,
            "text-[11px] font-medium uppercase tracking-[0.35em] sm:text-xs"
          )}
            style={{ color: GOLD }}>About Us</p>
          <h2 className={cn(
            playfair.className,
            "mt-4 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl"
          )}>Building Excellence</h2>
          <div className="relative mx-auto mt-8 h-px max-w-xs md:max-w-md">
            <div
              className="absolute inset-0 opacity-90 h-1"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, #C5A059 50%, transparent 100%)",
                boxShadow: "0 0 20px 1px rgba(197, 160, 89, 0.45)",
              }}
            />
          </div>
          <p className={cn(montserrat.className, "mt-6 text-sm tracking-tight text-zinc-400 sm:text-base")}>
            ICON LAOS, a premium development arm of Kolao Group, delivering investment-ready properties with trusted
            quality and long-term value.
          </p>
        </motion.div>
      </div>

      <div className="mx-auto mt-12 grid w-full max-w-6xl grid-cols-2 gap-4 sm:gap-5 lg:mt-14 lg:grid-cols-4 lg:gap-6">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.article
              key={item.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className={cn(playfair.className, "rounded-2xl border border-white/10 bg-white/3 px-4 py-5 text-center shadow-[0_10px_24px_-18px_rgba(0,0,0,0.8)] backdrop-blur-sm sm:px-5 sm:py-6")}
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center">
                <Image src={Icon} alt={item.label} width={48} height={48} />
              </div>
              <p className="mt-4 text-3xl font-semibold tracking-tight text-gold sm:text-4xl">{item.value}</p>
              <p className="mt-1 text-sm text-zinc-300 sm:text-base">{item.label}</p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
