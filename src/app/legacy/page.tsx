import type { Metadata } from "next";
import { DefaultHero } from "../default-hero";
import { PortfolioPage } from "../portfolio-page";

export const metadata: Metadata = {
  title: "Artem Suslov — Software Designer",
  description: "Software designer focused on B2C web and mobile products.",
};

export default function LegacyPortfolioPage() {
  return <PortfolioPage hero={<DefaultHero />} />;
}
