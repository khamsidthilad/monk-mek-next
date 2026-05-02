"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SectionLink } from "@/components/shared/SectionLink";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useI18n } from "@/components/providers/i18n-provider";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.svg";
import { Montserrat, Playfair_Display } from "next/font/google";
import { cn } from "@/lib/utils"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500"],
})
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
})
export default function PublicLayout({ children }: { children: ReactNode }) {
  const { t } = useI18n();
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showHeaderBg, setShowHeaderBg] = useState(false);
  const routeActiveSection = pathname.startsWith("/units/") ? "units" : null;
  const displayedActiveSection = routeActiveSection ?? activeSection;
  const isHomeSection = displayedActiveSection === "home";
  const isHomeActive = displayedActiveSection === "home" && !mobileMenuOpen;
  const actionIconColor = isHomeActive ? "text-white/95 hover:text-white" : "text-black/95 dark:text-white/80";
  // ✅ Shared container (FIX alignment issue)
  const containerClass = "px-4 sm:px-6";

  const navItems = useMemo(
    () => [
      { id: "home", label: t("public.home") },
      { id: "projects", label: t("public.projects") },
      { id: "units", label: t("public.units") },
      { id: "gallery", label: t("public.gallery") },
      { id: "contact", label: t("public.contact") },
    ],
    [t],
  );

  // ✅ Active section tracking (robust for mobile + desktop)
  useEffect(() => {
    const elements = navItems
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (elements.length === 0) return;

    const OFFSET = 140; // account for sticky header + top spacing

    const updateActiveSection = () => {
      const doc = document.documentElement;
      const scrollBottom = window.scrollY + window.innerHeight;
      const pageBottom = doc.scrollHeight - 2;
      const lastElement = elements[elements.length - 1];

      // Ensure the last nav item becomes active when reaching page end.
      if (lastElement && scrollBottom >= pageBottom) {
        setActiveSection(lastElement.id);
        return;
      }

      const cursor = window.scrollY + OFFSET;
      let current = elements[0].id;

      for (const element of elements) {
        if (element.offsetTop <= cursor) current = element.id;
        else break;
      }

      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [navItems, pathname]);

  // Normalize malformed URLs with multiple `#` fragments (e.g. /#units#home) to one hash.
  useEffect(() => {
    const h = window.location.hash;
    if (!h || !h.slice(1).includes("#")) return;
    const last = h
      .slice(1)
      .split("#")
      .filter(Boolean)
      .pop();
    if (last) {
      window.history.replaceState(null, "", `${window.location.pathname}#${last}`);
    }
  }, []);

  // ✅ Close mobile menu on hash change
  useEffect(() => {
    const close = () => setMobileMenuOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const pageHeight =
        document.documentElement.scrollHeight - window.innerHeight;
  
      const percent = (window.scrollY / pageHeight) * 100;
  
      setShowHeaderBg(percent >= 5);
    };
  
    handleScroll();
  
    window.addEventListener("scroll", handleScroll, { passive: true });
  
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ================= HEADER ================= */}
      <motion.header
  initial={{ y: -18, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  className={`sticky top-0 z-40 transition-all duration-700 ease-in-out ${
    isHomeActive && !showHeaderBg
      ? "bg-transparent border-transparent"
      : "border-b border-border bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/70"
  }`}
>
        <div className={`${containerClass} flex items-center justify-between gap-3 py-2`}>
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.015 }}>
            <Link
              href="/"
              className={cn(montserrat.className, "inline-flex items-center gap-2 text-sm font-semibold tracking-[0.2em] text-amber-500 ")}
            >
              <Image
                src={logo}
                alt="logo"
                width={logo.width}
                height={logo.height}
                sizes="(max-width: 768px) 40px, 60px"
                className="h-auto w-auto max-h-12 sm:max-h-14 "
                priority
              />
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item, index) => {
              const active = displayedActiveSection === item.id;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.20, delay: index * 0.04 }}
                >
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className={
                      active
                        ? "rounded-none border-0 border-b-2 border-gold bg-transparent text-gold hover:bg-transparent dark:hover:bg-transparent"
                        : `rounded-none border-0 border-b-2 border-transparent bg-transparent hover:border-gold/70 hover:bg-transparent hover:text-gold dark:text-white/80 dark:hover:bg-transparent ${
                            isHomeActive ? "text-white/95" : "text-black/95"
                          }`
                    }
                  >
                    <SectionLink
                      rootPath="/"
                      sectionId={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={cn(playfair.className, "uppercase tracking-[0.2em] text-sm font-semibold")}
                    >
                      {item.label}
                    </SectionLink>
                  </Button>
                </motion.div>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-1 md:flex">
            <LanguageSwitcher hideLabel heroMode={isHomeActive} />
            <ThemeToggle className={actionIconColor} />
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-1 md:hidden">
            <LanguageSwitcher hideLabel heroMode={isHomeActive} />
            <ThemeToggle className={actionIconColor} />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen((p) => !p)}
              className={
                mobileMenuOpen ? "bg-gold text-white" : isHomeActive ? "text-white/95 hover:text-white" : "text-black/95 dark:text-white/80"
              }
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* ================= MOBILE MENU ================= */}
        <AnimatePresence initial={false}>
          {mobileMenuOpen && (
            <motion.div
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`absolute top-full left-0 w-full md:hidden ${
                isHomeSection
                  ? "border-b border-white/20 bg-black/45 text-white backdrop-blur-xl"
                  : "border-b border-border bg-white/90 backdrop-blur-xl supports-backdrop-filter:bg-background/70"
              }`}
            >
              <div className={containerClass}>
                <nav className="flex flex-col gap-1 pb-4 pt-3">
                  {navItems.map((item) => {
                    const active = displayedActiveSection === item.id;

                    return (
                      <Button
                        key={item.id}
                        asChild
                        variant="ghost"
                        className={
                          active
                            ? "justify-start rounded-md bg-gold/10 text-gold"
                            : `justify-start rounded-md hover:bg-gold/10 hover:text-gold dark:text-white/80 ${
                                isHomeSection ? "text-white/95" : "text-black/95"
                              }`
                        }
                      >
                        <SectionLink
                          rootPath="/"
                          sectionId={item.id}
                          onClick={() => {
                            setActiveSection(item.id);
                            setMobileMenuOpen(false);
                          }}
                          className="uppercase tracking-[0.2em] text-sm font-semibold"
                        >
                          {item.label}
                        </SectionLink>
                      </Button>
                    );
                  })}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ================= MAIN ================= */}
      <main>{children}</main>
    </div>
  );
}