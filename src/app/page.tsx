import type { Metadata } from "next";
import { PortfolioPage } from "./portfolio-page";
import { V2Hero } from "./v2-hero";

export const metadata: Metadata = {
  title: "Artem Suslov — Software Designer",
  description: "Software designer focused on B2C web and mobile products.",
};

export default function NewPortfolioPage() {
  return (
    <PortfolioPage
      hero={<V2Hero />}
      showAbout={false}
      showTabs
      variant="v2"
    />
  );
}
