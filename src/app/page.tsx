import type { Metadata } from "next";
import Link from "next/link";
import { Sun, Volume2 } from "lucide-react";
import { PortfolioDebugPanel } from "@/components/portfolio-debug-panel";
import styles from "./page.module.css";
import { AboutMeContent } from "./about-me-content";
import { ContactButton } from "./contact-button";
import { HeroHeading } from "./hero-heading";
import { PortfolioCase } from "./portfolio-case";
import {
  PortfolioTabList,
  PortfolioTabPanels,
  PortfolioTabsProvider,
} from "./portfolio-tabs";
import { VerticalRuler } from "./vertical-ruler";

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
    height: number;
    preload?: boolean;
    src: string;
    type: "image";
    variant: "steamify" | "loop" | "s7" | "safe";
    width: number;
  } | {
    type: "interactive-card";
  } | {
    src: string;
    type: "video";
    variant: "loop";
  };
  id: string;
  title: string | false;
}> = [
  {
    accent: "20% to 50%",
    cover: {
      alt: "",
      height: 302,
      preload: true,
      src: "/images/steamify_2.png",
      type: "image",
      variant: "steamify",
      width: 494,
    },
    id: "steamify-case",
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
      height: 320,
      src: "/images/loop_case.png",
      type: "image",
      variant: "loop",
      width: 512,
    },
    id: "steamify-case-2",
    title: "Managing end-to-end AI agents",
  },
  {
    cover: {
      alt: "",
      height: 3318,
      src: "/images/S7_case.png",
      type: "image",
      variant: "s7",
      width: 6082,
    },
    id: "s7-case",
    title: "App for flight attendants that works offline",
  },
  {
    cover: {
      alt: "",
      height: 350,
      src: "/images/safe_case.png",
      type: "image",
      variant: "safe",
      width: 450,
    },
    id: "steamify-case-3",
    title: "Open source design system for Safe{Wallet} with 1400 users",
  },
];

export default function NewPortfolioPage() {
  return (
    <main className={styles.viewport}>
      <VerticalRuler />

      <nav className={styles.navigation} aria-label="Portfolio navigation">
        <a href="#work">Work</a>
        <Link href="/about">About me</Link>
        <a href="#tools">Tool I use</a>
      </nav>

      <article className={styles.portfolio}>
        <PortfolioTabsProvider>
          <header className={styles.intro}>
            <div className={styles.heroToolbar}>
              <div className={styles.heroIdentity}>
                <span className={styles.identityMark} aria-hidden="true" />
                <span className={styles.name}>Artem Suslov</span>
              </div>

              <div className={styles.heroActions}>
                <button
                  aria-label="Toggle color theme"
                  className={styles.iconButton}
                  type="button"
                >
                  <Sun aria-hidden="true" size={16} strokeWidth={1.5} />
                </button>
                <button
                  aria-label="Toggle sound"
                  className={styles.iconButton}
                  type="button"
                >
                  <Volume2 aria-hidden="true" size={16} strokeWidth={1.5} />
                </button>
                <ContactButton className={styles.contactButton} />
              </div>
            </div>

            <div className={styles.heroContent}>
              <video
                aria-hidden="true"
                autoPlay
                className={styles.portraitVideo}
                loop
                muted
                playsInline
                preload="metadata"
                poster="/videos/me_cycle_2-poster.webp"
              >
                <source src="/videos/me_cycle_2.mp4" type="video/mp4" />
              </video>
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
                {portfolioCases.map(({ accent, cover, id, title }) => (
                  <PortfolioCase
                    accent={accent}
                    caseId={id}
                    cover={cover}
                    key={id}
                    title={title}
                  />
                ))}
              </section>
            }
          />

          <span className={styles.anchor} id="tools" aria-hidden="true" />
          <span className={styles.anchor} id="steamify-case" aria-hidden="true" />
          <span className={styles.anchor} id="mesh-card-demo" aria-hidden="true" />
          <span
            className={styles.anchor}
            id="steamify-case-2"
            aria-hidden="true"
          />
          <span className={styles.anchor} id="s7-case" aria-hidden="true" />
          <span
            className={styles.anchor}
            id="steamify-case-3"
            aria-hidden="true"
          />
        </PortfolioTabsProvider>
      </article>

      <PortfolioDebugPanel
        cases={portfolioCases.map(({ id, title }) => ({
          id,
          label: title || id,
        }))}
      />
    </main>
  );
}
