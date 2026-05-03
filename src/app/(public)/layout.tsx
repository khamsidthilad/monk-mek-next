import type { Metadata } from "next";
import { Footer } from "@/components/public/components/footer";
import { Navbar } from "@/components/public/components/navbar";

export const metadata: Metadata = {
  title: "SportsPro - Premium Sports Gear",
  description:
    "Shop premium sports shoes, jerseys, and equipment. Elevate your game with SportsPro.",
  keywords: ["sports", "shoes", "jerseys", "equipment", "athletic", "gear"],
};

export const viewport = {
  themeColor: "#0a0a0a",
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
