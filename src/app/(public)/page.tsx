import {
  AboutUsSection,
  ContactUsSection,
  FooterSection,
  GallerySection,
  HomeSection,
  ProjectSection,
  ScrollToTopButton,
  UnitSection,
} from "@/components/public";
export default function HomePage() {
  return (
    <div>
      <HomeSection />
      <AboutUsSection />
      <ProjectSection />
      <UnitSection />
      <GallerySection />
      <ContactUsSection />
      <FooterSection />
      <ScrollToTopButton />
    </div>
  );
}
