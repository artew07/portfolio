import type { StaticImageData } from "next/image";
import type { ReactNode } from "react";
import safeCaseImage from "../../public/images/safe_case.png";
import styles from "./page.module.css";
import { AboutMeContent } from "./about-me-content";
import { PortfolioCase } from "./portfolio-case";
import { SoundProvider } from "./sound-provider";
import {
  PortfolioTabList,
  PortfolioTabPanels,
  PortfolioTabsProvider,
} from "./portfolio-tabs";

const workTabs = [
  { id: "all", label: "All projects" },
  { id: "case-study", label: "Case Study" },
  { id: "concepts", label: "Concepts" },
];

const portfolioCases: Array<{
  accent?: string;
  cover:
    | {
        alt: string;
        eager?: boolean;
        height: number;
        src: string | StaticImageData;
        type: "image";
        unoptimized?: boolean;
        variant: "steamify" | "loop" | "ccp" | "safe";
        width: number;
      }
    | { type: "interactive-card" }
    | { type: "phantom-glow" }
    | {
        mobileSrc?: string;
        src: string;
        type: "video";
        variant: "loop" | "ccp";
      };
  id: string;
  href?: string;
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
    href: "/steamify-skins-cashout",
    metadata: ["Steamify", "2024"],
    title: "How I increased CTR Web-to-Telegram button from",
  },
  { cover: { type: "interactive-card" }, id: "mesh-card-demo", title: "Interactive bank card" },
  {
    cover: { alt: "", height: 1393, src: "/images/loop_case.png?v=20260706-2", type: "image", variant: "loop", width: 2544 },
    id: "steamify-case-2",
    metadata: ["Personal research", "Concept", "2026", "Soon"],
    title: "Managing end-to-end AI agents",
  },
  {
    cover: { mobileSrc: "/videos/Mobile_CCP_2_Animation_Compress.mp4", src: "/videos/Desktop_CCP_2_Animation_Compress.mp4", type: "video", variant: "ccp" },
    id: "s7-case",
    metadata: ["KOTELOV", "iPad App", "2020", "Soon"],
    title: "App for flight attendants that works offline",
  },
  {
    cover: { type: "phantom-glow" },
    id: "glow-hover-effect",
    metadata: ["Concept", "2026"],
    title: "Phantom logo hover effect",
  },
  {
    cover: { alt: "", height: 697, src: safeCaseImage, type: "image", variant: "safe", width: 1272 },
    id: "steamify-case-3",
    metadata: ["Safe {Wallet}", "Design System", "2024"],
    title: "Open source design system with 1400 users",
  },
];

export async function PortfolioPage({
  hero,
  showAbout = true,
  showTabs = true,
  variant = "default",
}: {
  hero: ReactNode;
  showAbout?: boolean;
  showTabs?: boolean;
  variant?: "default" | "v2";
}) {
  const DebugPanel =
    process.env.NODE_ENV === "development"
      ? (await import("@/components/portfolio-debug-panel")).PortfolioDebugPanel
      : null;

  return (
    <main className={styles.viewport}>
      <SoundProvider>
        <PortfolioTabsProvider>
          <article
            className={`${styles.portfolio} ${
              variant === "v2" ? styles.v2Portfolio : ""
            }`}
          >
            {hero}
            {/* Temporarily hidden on the main V2 route. Restore when requested. */}
            {showTabs ? (
              <div className={styles.heroTabs}>
                <PortfolioTabList tabs={workTabs} />
              </div>
            ) : null}
            <PortfolioTabPanels
              work={
                <section className={styles.work} id="work" aria-label="Selected work">
                  {portfolioCases.map(({ accent, cover, href, id, metadata, title }) => (
                    <PortfolioCase accent={accent} caseId={id} cover={cover} href={href} key={id} metadata={metadata} title={title} />
                  ))}
                </section>
              }
            />
            {portfolioCases.map(({ id }) => <span className={styles.anchor} id={id} key={id} aria-hidden="true" />)}
            <span className={styles.anchor} id="tools" aria-hidden="true" />
          </article>

          {showAbout ? (
            <section className={styles.aboutSection} aria-labelledby="about-me">
              <h2 className={styles.aboutHeading} id="about-me">About Me</h2>
              <AboutMeContent />
            </section>
          ) : null}
        </PortfolioTabsProvider>
      </SoundProvider>

      {DebugPanel ? <DebugPanel cases={portfolioCases.map(({ id, title }) => ({ id, label: title || id }))} /> : null}
    </main>
  );
}
