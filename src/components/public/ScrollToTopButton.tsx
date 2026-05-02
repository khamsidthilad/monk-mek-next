"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUp, MessageCircle, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const whatsappHref = "https://wa.me/8562099999999";
  const callHref = "tel:+8562099999999";

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 420);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed right-5 bottom-5 z-50 flex flex-col items-center gap-2">
      <Button
        asChild
        size="icon"
        className="h-11 w-11 rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#1fb35a]"
        aria-label="Chat on WhatsApp"
      >
        <Link href={whatsappHref} target="_blank" rel="noopener noreferrer">
          <MessageCircle className="h-5 w-5" />
        </Link>
      </Button>

      <Button
        asChild
        size="icon"
        className="h-11 w-11 rounded-full bg-sky-500 text-white shadow-lg hover:bg-sky-600"
        aria-label="Call now"
      >
        <Link href={callHref}>
          <PhoneCall className="h-5 w-5" />
        </Link>
      </Button>

      {visible ? (
        <Button
          type="button"
          size="icon"
          className="h-11 w-11 rounded-full bg-gold text-black shadow-lg hover:bg-gold-600"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      ) : null}
    </div>
  );
}
