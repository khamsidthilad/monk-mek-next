"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type MouseEventHandler,
} from "react";

export type SectionLinkProps = Omit<ComponentPropsWithoutRef<typeof Link>, "href"> & {
  /** Target element `id` (without `#`). */
  sectionId: string;
  /** Optional fixed path target (e.g. "/"). */
  rootPath?: string;
};

/**
 * Same-page section links: use `history.replaceState` so the URL stays a single
 * `#fragment` (`/…#units`), avoiding stacked fragments from the App Router + hash
 * (`/#units#home#…`) when combined with smooth scroll / client navigation.
 */
export const SectionLink = forwardRef<HTMLAnchorElement, SectionLinkProps>(
  function SectionLink({ sectionId, rootPath, onClick, ...props }, ref) {
    const pathname = usePathname();
    const basePath = rootPath ?? pathname?.split("#")[0] ?? "/";
    const cleanId = sectionId.replace(/^#/, "");
    const href = `${basePath}#${cleanId}`;

    const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
      if (typeof window === "undefined") {
        onClick?.(event);
        return;
      }

      if (window.location.pathname !== basePath) {
        onClick?.(event);
        return;
      }

      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
        onClick?.(event);
        return;
      }

      event.preventDefault();
      document.getElementById(cleanId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      window.history.replaceState(null, "", `${basePath}#${cleanId}`);
      window.dispatchEvent(new Event("hashchange"));
      onClick?.(event);
    };

    return <Link ref={ref} href={href} onClick={handleClick} {...props} />;
  },
);
