import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { getUnitById } from "@/lib/unit-data";
import { Button } from "@/components/ui/button";
import { UnitThumbnailCarousel } from "./UnitThumbnailCarousel";
import { Montserrat } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import { cn } from "@/lib/utils"
import imDetail from "@/assets/images/detail.svg";
import Image from "next/image";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500"],
})

type UnitDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function UnitDetailPage({ params }: UnitDetailPageProps) {
  const { id } = await params;
  const unit = await getUnitById(id);

  if (!unit) {
    notFound();
  }

  const progressPercent = unit.status === "Available" ? 65 : 100;

  return (
    <section className="bg-white px-4 py-6 text-zinc-900 sm:px-6 md:px-8 lg:px-10 xl:px-12">
      <div className="mx-auto w-full max-w-7xl">

        {/* Back */}
        <Link
          href="/#units"
          className="inline-flex items-center gap-2 text-xs font-medium text-zinc-500 hover:text-zinc-800 sm:text-sm"
        >
          <ArrowLeft className={cn(playfair.className, "h-4 w-4")} />
          Back to Units
        </Link>

        {/* Layout */}
        <div className="mt-5 grid gap-6 lg:grid-cols-2 xl:grid-cols-[2.5fr_1fr]">

          {/* LEFT */}
          <div className={cn(playfair.className, "w-full")}>
            <UnitThumbnailCarousel />
          </div>

          {/* RIGHT */}
          <div className={cn(playfair.className, "space-y-5")}>

            {/* Status */}
            <div className={cn(playfair.className, "inline-flex w-fit rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 sm:text-sm")}>
              {unit.status}
            </div>

            {/* Title */}
            <div>
              <h1 className={cn(playfair.className, "text-2xl font-semibold leading-tight sm:text-3xl lg:text-4xl")}>
                {unit.title}
              </h1>
              <p className={cn(montserrat.className, "mt-1 text-sm text-zinc-500 sm:text-base lg:text-lg")}>
                {unit.areaSqm} sqm · Floor {unit.floorRange}
              </p>
            </div>

            {/* Progress */}
            <div>
              <div className={cn(playfair.className, "h-2 w-full rounded-full bg-zinc-200")}>
                <div
                  className={cn(playfair.className, "h-2 rounded-full bg-[#c79d4f]")}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className={cn(montserrat.className, "mt-2 text-xs text-zinc-500 sm:text-sm")}>
                {progressPercent}% booked · Expected completion {unit.completion}
              </p>
            </div>

            {/* Features */}
            <div>
              <p className={cn(playfair.className, "text-sm font-semibold sm:text-base lg:text-lg")}>
                Premium Features
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {unit.features.map((feature) => (
                  <span
                    key={feature}
                    className="rounded-full border border-[#e1cfaa] px-3 py-1 text-xs text-[#87642b] sm:text-sm"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Floor Plan */}
            <div>
              <p className={cn(playfair.className, "text-sm font-semibold sm:text-base lg:text-lg")}>
                Floor Plan
              </p>
              <div className={cn(playfair.className, "mt-2 h-40 w-full rounded-md border border-zinc-200 bg-linear-to-br from-zinc-100 via-zinc-50 to-zinc-200 sm:h-52 lg:h-60")}>
                <Image src={imDetail} alt="Floor Plan" width={1000} height={1000} className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Pricing */}
            <div className={cn(playfair.className, "space-y-2 border-t border-zinc-200 pt-4 text-sm")}>
              <div className={cn(playfair.className, "flex justify-between text-zinc-600")}>
                <span className={cn(playfair.className, "text-sm font-semibold sm:text-base lg:text-lg")}>Price</span>
                <span className={cn(playfair.className, "text-sm font-semibold sm:text-base lg:text-lg")}>${unit.price}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span className={cn(playfair.className, "text-sm font-semibold sm:text-base lg:text-lg")}>Transfer Tax (1%)</span>
                <span className={cn(playfair.className, "text-sm font-semibold sm:text-base lg:text-lg")}>{unit.transferTax}</span>
              </div>
              <div className="flex justify-between pt-2 text-lg font-semibold sm:text-xl">
                <span className={cn(playfair.className, "text-sm font-semibold sm:text-base lg:text-lg")}>Total</span>
                <span className={cn(playfair.className, "text-sm font-semibold sm:text-base lg:text-lg")}>{unit.finalPrice}</span>
              </div>
            </div>

            {/* Actions */}
            <div className={cn(playfair.className, "grid gap-3 pt-2 sm:grid-cols-2")}  >
              <Button className={cn(playfair.className, "h-11 w-full rounded-md bg-linear-to-r from-[#c9a55c] via-[#dec089] to-[#f0e0bd] text-zinc-900 hover:opacity-90")}>
                Reserve
              </Button>

              <Button
                variant="outline"
                className={cn(playfair.className, "flex h-11 w-full items-center justify-center gap-2 rounded-md border-[#cfb581] text-[#87642b] hover:bg-[#faf3e4]")}
              >
                <CheckCircle2 className={cn(playfair.className, "h-4 w-4")}  />
                Contact Sales Team
              </Button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}