import type { StaticImageData } from "next/image";
import type { ReactNode } from "react";
import safeDesignSystemThumbnail from "../../public/images/safe_design_system_thumbnail.png";
import styles from "./page.module.css";
import { AboutMeContent } from "./about-me-content";
import { CodexShimmer } from "./codex-shimmer";
import { PortfolioCase } from "./portfolio-case";
import { SoundProvider } from "./sound-provider";
import {
  PortfolioTabList,
  PortfolioTabPanels,
  PortfolioTabsProvider,
} from "./portfolio-tabs";

const workTabs = [
  { id: "favourites", label: "Favorites" },
  { id: "case-study", label: "Work" },
  { id: "my-products", label: "My products" },
  { id: "craft", label: "Craft" },
];

const portfolioCases: Array<{
  accent?: string;
  cover:
    | {
        foreground?: {
          alt: string;
          height: number;
          src: string;
          width: number;
        };
        src: string;
        type: "background";
      }
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
    | { type: "placeholder" }
    | {
        mobileSrc?: string;
        src: string;
        type: "video";
        variant: "loop" | "ccp" | "animator" | "steamify";
      };
  id: string;
  href?: string;
  metadata?: string[];
  metadataLinks?: Array<{
    href: string;
    item: string;
  }>;
  title: string | false;
}> = [
  {
    accent: "20% to 50%",
    // Static cover retained for a quick rollback.
    // cover: {
    //   alt: "",
    //   eager: true,
    //   height: 302,
    //   src: "/images/steamify_2.webp",
    //   type: "image",
    //   unoptimized: true,
    //   variant: "steamify",
    //   width: 494,
    // },
    cover: {
      src: "/videos/steamify_thumb_case.mp4?v=20260801-4",
      type: "video",
      variant: "steamify",
    },
    id: "steamify-case",
    href: "/steamify-skins-cashout",
    metadata: ["Steamify", "2024"],
    metadataLinks: [
      {
        href: "https://steamify.io/cashout/cs2",
        item: "Steamify",
      },
    ],
    title: "Steam cash-out service: Increased Web-to-Telegram CTR from",
  },
  {
    cover: { type: "interactive-card" },
    id: "mesh-card-demo",
    metadata: ["Design engineering practice"],
    title: "Interactive bank card built with Paper Shaders",
  },
  {
    cover: { alt: "", height: 1393, src: "/images/loop_case.png?v=20260706-2", type: "image", variant: "loop", width: 2544 },
    id: "steamify-case-2",
    metadata: ["Personal research", "2026"],
    title: "Workspace for managing AI agents",
  },
  {
    cover: {
      mobileSrc: "/videos/animator_demo_mobile.mp4",
      src: "/videos/animator_demo.mp4",
      type: "video",
      variant: "animator",
    },
    id: "animator",
    metadata: ["Animator", "2026", "Watch how I built it"],
    metadataLinks: [
      { href: "https://getanimator.xyz/", item: "Animator" },
      {
        href: "https://youtu.be/d9Nve2VaHQ4?si=Jy_Wdt_buRd10kKW",
        item: "Watch how I built it",
      },
    ],
    title: "Browser-based tool for seamless carousels",
  },
  {
    cover: {
      alt: "",
      height: 697,
      src: safeDesignSystemThumbnail,
      type: "image",
      variant: "safe",
      width: 1272,
    },
    id: "ccp-design-system",
    metadata: ["Safe {Wallet}", "2023"],
    metadataLinks: [{ href: "https://safe.global/", item: "Safe {Wallet}" }],
    title: "Open-source design system used by 1,500+ people",
  },
  {
    cover: {
      foreground: {
        alt: "Steamify Trading Bot dashboard",
        height: 1038,
        src: "/images/steamify_trading_bot_case_thumb.webp",
        width: 1600,
      },
      src: "/images/AI_Bg_083.png",
      type: "background",
    },
    id: "orbit",
    metadata: ["Steamify", "2023"],
    metadataLinks: [
      { href: "https://steamify.io/cashout/cs2", item: "Steamify" },
    ],
    title: "Steam trading management dashboard",
  },
  {
    cover: {
      foreground: {
        alt: "Playdex game marketplace",
        height: 1038,
        src: "/images/playdex_thumbnail.webp",
        width: 1600,
      },
      src: "/images/AI_Bg_051.png",
      type: "background",
    },
    id: "northstar",
    metadata: ["Playdex", "2023"],
    title: "Web3 NFT marketplace for gamers in Asia",
  },
  {
    cover: { mobileSrc: "/videos/Mobile_CCP_2_Animation_Compress.mp4", src: "/videos/Desktop_CCP_2_Animation_Compress.mp4", type: "video", variant: "ccp" },
    id: "s7-case",
    metadata: ["KOTELOV", "2020"],
    metadataLinks: [{ href: "https://kotelov.com/", item: "KOTELOV" }],
    title: "Offline iPad app for flight attendants",
  },
  {
    cover: { type: "phantom-glow" },
    id: "glow-hover-effect",
    title: "Interactive Phantom logo hover effect",
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

  function renderWork(caseIds: string[]) {
    const selectedCases = caseIds.flatMap((caseId) => {
      const portfolioCase = portfolioCases.find(({ id }) => id === caseId);
      return portfolioCase ? [portfolioCase] : [];
    });

    return (
      <section className={styles.work} id="work" aria-label="Selected work">
        {selectedCases.map(
          ({ accent, cover, href, id, metadata, metadataLinks, title }) => (
            <PortfolioCase
              accent={accent}
              caseId={id}
              cover={cover}
              href={href}
              key={id}
              metadata={metadata}
              metadataLinks={metadataLinks}
              title={title}
            />
          ),
        )}
      </section>
    );
  }

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
            {showTabs ? (
              <div className={styles.heroTabs}>
                <PortfolioTabList tabs={workTabs} />
              </div>
            ) : null}
            <PortfolioTabPanels
              panels={{
                favourites: renderWork([
                  "animator",
                  "steamify-case",
                  "s7-case",
                  "mesh-card-demo",
                ]),
                "case-study": renderWork([
                  "steamify-case",
                  "orbit",
                  "ccp-design-system",
                  "northstar",
                  "s7-case",
                ]),
                "my-products": renderWork(["animator"]),
                craft: (
                  <div className={styles.tabPanel}>
                    <p className={styles.tabDescription}>
                      Design engineering experiments made in <CodexShimmer />
                    </p>
                    {renderWork([
                      "mesh-card-demo",
                      "steamify-case-2",
                      "glow-hover-effect",
                    ])}
                  </div>
                ),
              }}
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
