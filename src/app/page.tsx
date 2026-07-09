import type { Metadata } from "next";
import type { StaticImageData } from "next/image";
// import { Sun } from "lucide-react";
import safeCaseImage from "../../public/images/safe_case.png";
import styles from "./page.module.css";
import { AboutMeContent } from "./about-me-content";
import { ContactButton } from "./contact-button";
import { HeroHeading } from "./hero-heading";
import { HeroVideo } from "./hero-video";
import { PortfolioCase } from "./portfolio-case";
import { SoundProvider } from "./sound-provider";
import { SoundToggleButton } from "./sound-toggle-button";
import {
  PortfolioTabList,
  PortfolioTabPanels,
  PortfolioTabsProvider,
} from "./portfolio-tabs";
// import { VerticalRuler } from "./vertical-ruler";

export const metadata: Metadata = {
  title: "Artem Suslov — Software Designer",
  description: "Software designer focused on B2C web and mobile products.",
};

const workTabs = [
  { id: "all", label: "All projects" },
  { id: "case-study", label: "Case Study" },
  { id: "concepts", label: "Concepts" },
  { id: "about", label: "About me" },
];

const portfolioCases: Array<{
  accent?: string;
  cover: {
    alt: string;
    eager?: boolean;
    height: number;
    src: string | StaticImageData;
    type: "image";
    unoptimized?: boolean;
    variant: "steamify" | "loop" | "ccp" | "safe";
    width: number;
  } | {
    type: "interactive-card";
  } | {
    type: "phantom-glow";
  } | {
    src: string;
    type: "video";
    variant: "loop";
  };
  id: string;
  metadata?: string[];
  title: string | false;
}> = [
  {
    accent: "20% to 50%",
    cover: {
      alt: "",
      eager: true,
      height: 302,
      src: "/images/steamify_2.webp",
      type: "image",
      unoptimized: true,
      variant: "steamify",
      width: 494,
    },
    id: "steamify-case",
    metadata: ["Steamify", "2024"],
    title: "How I increased CTR Web-to-Telegram button from",
  },
  {
    cover: {
      type: "interactive-card",
    },
    id: "mesh-card-demo",
    title: "Interactive bank card",
  },
  {
    cover: {
      alt: "",
      height: 1393,
      src: "/images/loop_case.png?v=20260706-2",
      type: "image",
      variant: "loop",
      width: 2544,
    },
    id: "steamify-case-2",
    metadata: ["Personal research", "Concept", "2026"],
    title: "Managing end-to-end AI agents",
  },
  {
    cover: {
      alt: "",
      height: 669,
      src: "/images/CCP_case.png",
      type: "image",
      variant: "ccp",
      width: 939,
    },
    id: "s7-case",
    metadata: ["KOTELOV", "iPad App", "2020"],
    title: "App for flight attendants that works offline",
  },
  {
    cover: {
      type: "phantom-glow",
    },
    id: "glow-hover-effect",
    metadata: ["Concept", "2026"],
    title: "Phantom logo hover effect",
  },
  {
    cover: {
      alt: "",
      height: 697,
      src: safeCaseImage,
      type: "image",
      variant: "safe",
      width: 1272,
    },
    id: "steamify-case-3",
    metadata: ["Safe {Wallet}", "Design System", "2024"],
    title: "Open source design system with 1400 users",
  },
];

export default async function NewPortfolioPage() {
  const DebugPanel =
    process.env.NODE_ENV === "development"
      ? (await import("@/components/portfolio-debug-panel"))
          .PortfolioDebugPanel
      : null;

  return (
    <main className={styles.viewport}>
      {/* <VerticalRuler /> */}

      <SoundProvider>
        <article className={styles.portfolio}>
          <PortfolioTabsProvider>
            <header className={styles.intro}>
              <div className={styles.heroToolbar}>
                <div className={styles.heroIdentity}>
                  <span className={styles.identityMark} aria-hidden="true" />
                  <span className={styles.name}>Artem Suslov</span>
                </div>

                <div className={styles.heroActions}>
                  {/* <button
                    aria-label="Toggle color theme"
                    className={styles.iconButton}
                    type="button"
                  >
                    <Sun aria-hidden="true" size={16} strokeWidth={1.5} />
                  </button> */}
                  <SoundToggleButton className={styles.iconButton} />
                  {/* <CvButton className={styles.cvButton} /> */}
                  <ContactButton className={styles.contactButton} />
                </div>
              </div>

              <div className={styles.heroContent}>
                <HeroVideo />
                <HeroHeading />
              </div>

              <span className={styles.heroDivider} aria-hidden="true" />

              <div className={styles.heroTabs}>
                <PortfolioTabList tabs={workTabs} />
              </div>
            </header>

            <PortfolioTabPanels
              about={<AboutMeContent />}
              work={
                <section
                  className={styles.work}
                  id="work"
                  aria-label="Selected work"
                >
                  {portfolioCases.map(
                    ({ accent, cover, id, metadata, title }) => (
                      <PortfolioCase
                        accent={accent}
                        caseId={id}
                        cover={cover}
                        key={id}
                        metadata={metadata}
                        title={title}
                      />
                    ),
                  )}
                </section>
              }
            />

            <span className={styles.anchor} id="tools" aria-hidden="true" />
            <span
              className={styles.anchor}
              id="steamify-case"
              aria-hidden="true"
            />
            <span
              className={styles.anchor}
              id="mesh-card-demo"
              aria-hidden="true"
            />
            <span
              className={styles.anchor}
              id="steamify-case-2"
              aria-hidden="true"
            />
            <span className={styles.anchor} id="s7-case" aria-hidden="true" />
            <span
              className={styles.anchor}
              id="glow-hover-effect"
              aria-hidden="true"
            />
            <span
              className={styles.anchor}
              id="steamify-case-3"
              aria-hidden="true"
            />
          </PortfolioTabsProvider>
        </article>
      </SoundProvider>

      {DebugPanel ? (
        <DebugPanel
          cases={portfolioCases.map(({ id, title }) => ({
            id,
            label: title || id,
          }))}
        />
      ) : null}
    </main>
  );
}
