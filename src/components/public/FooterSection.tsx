"use client";

import Link from "next/link";
import { Globe, ImageIcon, Info, Phone } from "lucide-react";
import { SectionLink } from "@/components/shared/SectionLink";
import { useI18n } from "@/components/providers/i18n-provider";
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

export function FooterSection() {
  const { t } = useI18n();

  const sectionLinks = [
    { id: "home", label: t("public.home") },
    { id: "projects", label: t("public.projects") },
    { id: "units", label: t("public.units") },
    { id: "gallery", label: t("public.gallery") },
    { id: "contact", label: t("public.contact") },
  ] as const;

  return (
    <footer className="relative left-1/2 right-1/2 mx-[-50vw] w-screen border-t border-[#3a3a3a] bg-[#2b2b2d] px-4 py-6 text-white sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <div className="text-center">
          <h2 className={cn(playfair.className, "text-4xl font-semibold tracking-wide text-zinc-100 sm:text-5xl")}>ICONLAO</h2>
          <p className={cn(montserrat.className, "mx-auto mt-3 max-w-4xl text-xs leading-relaxed text-zinc-300")}>
            ICONLAO smart software is available on most mobile platforms. All your demands are wrapped up in one tool
            for your most convenient life at iconlao. All in One with service registration, communication with customer
            service department/manager. For more detail, access the link:
            https://iconlao.com/en/home/green
          </p>
        </div>

        <div className={cn(playfair.className, "mt-5 border-t border-[#3a3a3a] pt-4")}>
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <ul className={cn(playfair.className, "flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] font-medium uppercase tracking-[0.12em] text-zinc-300")}>
            {sectionLinks.map((item) => (
              <li key={item.id}>
                <SectionLink sectionId={item.id} className={cn(playfair.className, "inline-flex py-0.5 hover:text-gold")}>
                  {item.label}
                </SectionLink>
              </li>
            ))}
          </ul>

            <div className={cn(playfair.className, "flex items-center gap-2 text-xs text-zinc-200")}>
              <Link
                href="tel:+8562012345678"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#4a4a4a] px-3 py-1.5 hover:text-gold"
              >
                <Phone className="h-3.5 w-3.5" />
                Contact
              </Link>
              <Link href="#" className="rounded-full border border-[#4a4a4a] p-1.5 hover:text-gold" aria-label="Website">
                <Globe className="h-3.5 w-3.5" />
              </Link>
              <Link href="#" className="rounded-full border border-[#4a4a4a] p-1.5 hover:text-gold" aria-label="Information">
                <Info className="h-3.5 w-3.5" />
              </Link>
              <Link href="#" className="rounded-full border border-[#4a4a4a] p-1.5 hover:text-gold" aria-label="Instagram">
                <ImageIcon className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
