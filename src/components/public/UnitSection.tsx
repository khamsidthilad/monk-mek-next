"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { BedDouble, Building2, Check, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { unitRecords } from "@/lib/unit-data";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Playfair_Display, Montserrat } from "next/font/google";
import { cn } from "@/lib/utils"
import imRoom from "@/assets/images/room.svg";
import Image from "next/image";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500"],
})

export function UnitSection() {
  const pathname = usePathname();
  const unitsAnchorHref = `${pathname?.split("#")[0] ?? "/"}#units`;

  const roomTypeOptions = ["ALL BEDROOM TYPE", "1 BEDROOM", "2 BEDROOM", "3 BEDROOM"] as const;
  const statusOptions = ["ALL TYPE", "AVAILABLE", "SOLD"] as const;
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRoomType, setSelectedRoomType] = useState<(typeof roomTypeOptions)[number]>("ALL BEDROOM TYPE");
  const [selectedStatus, setSelectedStatus] = useState<(typeof statusOptions)[number]>("ALL TYPE");
  const [roomTypeOpen, setRoomTypeOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

  const filteredCards = useMemo(() => {
    return unitRecords.filter((card) => {
      const roomTypeMatch = selectedRoomType === "ALL BEDROOM TYPE" || card.roomType === selectedRoomType;
      const statusMatch = selectedStatus === "ALL TYPE" || card.status.toUpperCase() === selectedStatus;
      return roomTypeMatch && statusMatch;
    });
  }, [selectedRoomType, selectedStatus]);

  const totalPages = Math.max(1, Math.ceil(filteredCards.length / itemsPerPage));
  const pagedCards = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCards.slice(start, start + itemsPerPage);
  }, [currentPage, filteredCards]);

  const pageNumbers = useMemo(() => Array.from({ length: totalPages }, (_, index) => index + 1), [totalPages]);

  function goPrev() {
    setCurrentPage((prev) => (prev === 1 ? totalPages : prev - 1));
  }

  function goNext() {
    setCurrentPage((prev) => (prev === totalPages ? 1 : prev + 1));
  }

  return (
    <section id="units" className="scroll-mt-28 bg-[#25262B] px-4 py-14 text-white sm:px-6 sm:py-16 lg:px-10 lg:py-20">
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.35 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className={cn(playfair.className, "text-xs font-semibold uppercase tracking-[0.24em] text-gold")}>Unit</p>
          <h2 className={cn(playfair.className, "mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl")}>Select Your Residence</h2>
          <p className={cn(montserrat.className, "mx-auto mt-4 max-w-xl text-sm leading-relaxed text-zinc-300 sm:text-base")}>
            Thoughtfully designed spaces for every lifestyle
          </p>
        </motion.div>

        <div className="mx-auto mt-8 flex max-w-3xl flex-col items-start gap-3 sm:mt-9 sm:flex-row sm:items-center">
          <p className={cn(montserrat.className, "text-xl text-zinc-200 whitespace-nowrap")}>Select Room Type:</p>
          <div className="flex w-full flex-col gap-2 sm:flex-row">
            <Popover open={roomTypeOpen} onOpenChange={setRoomTypeOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  className={cn(playfair.className, "h-10 w-full justify-between rounded-full bg-linear-to-r from-[#be9649] to-[#d8b56d] px-4 text-sm font-medium text-zinc-950 hover:opacity-90 sm:w-[260px]")}
                >
                  <span className="inline-flex items-center gap-2">
                    <BedDouble className={cn(playfair.className, "h-4 w-4")} />
                    {selectedRoomType}
                  </span>
                  <ChevronDown className={cn(playfair.className, "h-4 w-4")} />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className={cn(playfair.className, "w-64 rounded-xl border-zinc-700/80 bg-[#2c2d32] p-2 text-zinc-100")}>
                <div className="space-y-1">
                  {roomTypeOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setSelectedRoomType(option);
                        setCurrentPage(1);
                        setRoomTypeOpen(false);
                      }}
                      className={cn(playfair.className, "flex w-full items-center justify-between rounded-md px-2.5 py-2 text-left text-sm hover:bg-white/10")}
                    >
                      <span>{option}</span>
                      {selectedRoomType === option ? <Check className="h-4 w-4 text-gold" /> : null}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            <Popover open={statusOpen} onOpenChange={setStatusOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  className={cn(playfair.className, "h-10 w-full justify-between rounded-full bg-linear-to-r from-[#be9649] to-[#d8b56d] px-4 text-sm font-medium text-zinc-950 hover:opacity-90 sm:w-[180px]")}
                >
                  <span className="inline-flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    {selectedStatus}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-52 rounded-xl border-zinc-700/80 bg-[#2c2d32] p-2 text-zinc-100">
                <div className="space-y-1">
                  {statusOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setSelectedStatus(option);
                        setCurrentPage(1);
                        setStatusOpen(false);
                      }}
                      className="flex w-full items-center justify-between rounded-md px-2.5 py-2 text-left text-sm hover:bg-white/10"
                    >
                      <span>{option}</span>
                      {selectedStatus === option ? <Check className="h-4 w-4 text-gold" /> : null}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 grid w-full max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pagedCards.map((unit, index) => (
          <motion.div
            key={unit.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.3, delay: index * 0.04 }}
          >
            <Link href={`/units/${unit.id}`} className="block cursor-pointer">
              <Card
                className="group overflow-hidden rounded-lg border border-white/10 bg-[#2c2d32] shadow-none transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02] hover:border-gold/45 hover:shadow-[0_0_18px_rgba(202,163,90,0.45)]"
              >
                <div className="relative h-44 overflow-hidden bg-linear-to-br from-zinc-300 via-zinc-200 to-zinc-400">
                  <span
                    className={cn(
                      playfair.className,
                      `absolute right-3 top-3 z-10 rounded-full px-2.5 py-1 text-xs font-medium ${unit.status === "Available"
                        ? "bg-emerald-500/90 text-white"
                        : "bg-red-600/90 text-white"
                      }`
                    )}
                  >
                    {unit.status}
                  </span>

                  <Image
                    src={imRoom}
                    alt={unit.title}
                    width={100}
                    height={100}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </div>

                <CardContent className="space-y-2 px-4 py-4">
                  <h3
                    className={cn(
                      playfair.className,
                      "text-[26px] font-medium text-zinc-100 transition-colors duration-300 group-hover:text-gold"
                    )}
                  >
                    {unit.title}
                  </h3>

                  <p
                    className={cn(
                      playfair.className,
                      "text-[11px] uppercase tracking-[0.14em] text-zinc-400"
                    )}
                  >
                    From{" "}
                    <span className="ml-1 text-4xl font-semibold tracking-normal text-gold">
                      {unit.price}
                    </span>
                  </p>

                  <p className={cn(playfair.className, "text-lg text-zinc-400")}>
                    {unit.size}
                  </p>

                  <span
                    className={cn(
                      playfair.className,
                      "inline-flex items-center gap-1 text-lg font-medium text-[#caa35a] transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                    )}
                  >
                    View Details
                    <ChevronRight className="h-4 w-4" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
      {pagedCards.length === 0 ? (
        <p className={cn(montserrat.className, "mx-auto mt-8 max-w-6xl text-center text-sm text-zinc-300")}>No units match this filter.</p>
      ) : null}

      <Pagination className={cn(playfair.className, "mx-auto mt-8 w-full max-w-6xl")}>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={unitsAnchorHref}
              text="Prev"
              className={cn(playfair.className, "border border-white/20 text-zinc-300 hover:bg-white/10 hover:text-white")}
              onClick={(event) => {
                event.preventDefault();
                goPrev();
              }}
            />
          </PaginationItem>

          {pageNumbers.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href={unitsAnchorHref}
                isActive={currentPage === page}
                className={
                  currentPage === page
                    ? cn(playfair.className, "border border-white/25 bg-zinc-500 text-white hover:bg-zinc-500")
                    : cn(playfair.className, "text-zinc-300 hover:bg-white/10 hover:text-white")
                }
                onClick={(event) => {
                  event.preventDefault();
                  setCurrentPage(page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href={unitsAnchorHref}
              text="Next"
              className={cn(playfair.className, "border border-white/20 text-zinc-300 hover:bg-white/10 hover:text-white")}
              onClick={(event) => {
                event.preventDefault();
                goNext();
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
}
