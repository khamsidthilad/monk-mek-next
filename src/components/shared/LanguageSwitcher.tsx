"use client";

import * as React from "react";
import Image from "next/image";
import { Check, Globe } from "lucide-react";

import { cn } from "@/lib/utils";
import { useI18n } from "@/components/providers/i18n-provider";
import { type Locale, LOCALES } from "@/lib/i18n";

const GOLD = "#C5A059";
const PANEL_BG = "#2A2A2A";
const ROW_ACTIVE = "#6B4F1D";

const LANG_CODE: Record<Locale, string> = {
  en: "EN",
  th: "TH",
  lo: "LO",
  ko: "KO",
  zh: "ZH",
};

const localeLabelByUiLocale: Record<Locale, Record<Locale, string>> = {
  en: {
    en: "English",
    th: "Thai",
    lo: "Lao",
    ko: "Korean",
    zh: "Chinese",
  },
  th: {
    en: "English",
    th: "ไทย",
    lo: "ลาว",
    ko: "เกาหลี",
    zh: "จีน",
  },
  lo: {
    en: "ອັງກິດ",
    th: "ໄທ",
    lo: "ລາວ",
    ko: "ເກົາຫຼີ",
    zh: "ຈີນ",
  },
  ko: {
    en: "영어",
    th: "태국어",
    lo: "라오어",
    ko: "한국어",
    zh: "중국어",
  },
  zh: {
    en: "英语",
    th: "泰语",
    lo: "老挝语",
    ko: "韩语",
    zh: "中文",
  },
};

function FlagIcon({
  lang,
  className,
}: {
  lang: Locale;
  className?: string;
}) {
  const cls = cn(
    "h-[11px] w-4 shrink-0 rounded-[2px] object-cover",
    className
  );

  const swatch: Record<Locale, string> = {
    en: "bg-blue-700",
    th: "bg-red-600",
    lo: "bg-red-800",
    ko: "bg-blue-600",
    zh: "bg-red-700",
  };

  return <span className={cn(cls, swatch[lang])} aria-hidden />;
}

export function LanguageSwitcher({ heroMode = false, }: { hideLabel?: boolean; heroMode?: boolean; }) {
  const { locale, setLocale } = useI18n();

  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;

    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn( "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-white transition-colors hover:bg-white/5", heroMode ? "border-white/30 bg-white/10 text-white hover:bg-white/20" : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800", )}
        style={{ borderColor: GOLD }}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Select language"
      >
        <Globe
          className="size-4 shrink-0"
          style={{ color: GOLD }}
          strokeWidth={1.25}
        />

        <FlagIcon lang={locale} />
        <span className="font-sans">{LANG_CODE[locale]}</span>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Language list"
          className="absolute right-0 z-60 mt-2 min-w-55 overflow-hidden rounded-lg border py-0 shadow-xl"
          style={{
            backgroundColor: PANEL_BG,
            borderColor: GOLD,
          }}
        >
          {LOCALES.map((item) => {
            const active = item === locale;

            return (
              <li key={item} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => {
                    setLocale(item);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm font-sans text-white transition-colors",
                    active ? "" : "hover:bg-white/5"
                  )}
                  style={
                    active
                      ? {
                          backgroundColor: ROW_ACTIVE,
                        }
                      : undefined
                  }
                >
                  <FlagIcon lang={item} />

                  <span className="min-w-0 flex-1 truncate">
                    {localeLabelByUiLocale[locale][item]}
                  </span>

                  {active ? (
                    <Check
                      className="size-4 shrink-0 text-white"
                      strokeWidth={2}
                    />
                  ) : (
                    <span className="size-4 shrink-0" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}