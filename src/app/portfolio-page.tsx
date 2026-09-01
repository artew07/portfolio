import type { StaticImageData } from "next/image";
import type { ReactNode } from "react";
import safeDesignSystemThumbnail from "../../public/images/safe_design_system_thumbnail.png";
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
  { id: "case-study", label: "Work" },
  { id: "favourites", label: "Favorites" },
  { id: "my-products", label: "My products" },
  { id: "craft", label: "Craft" },
];

type CaseDetails = {
  company: string;
  companyHref?: string;
  description: string;
  descriptionLink?: {
    href: string;
    label: string;
  };
  period: string;
  role: string;
  showMetadata?: boolean;
  title: string;
};

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
        variant:
          | "loop"
          | "ccp"
          | "animator"
          | "steamify"
          | "quick-stickers"
          | "freelance-tracker";
      };
  id: string;
  details?: CaseDetails;
  description?: string;
  href?: string;
  metadata?: string[];
  metadataLinks?: Array<{
    href: string;
    item: string;
  }>;
  title: string | false;
  titleLink?: string;
}> = [
  {
    cover: {
      src: "/videos/telegram-quick-stickers.mp4?v=c485a029f0b2",
      type: "video",
      variant: "quick-stickers",
    },
    id: "telegram-quick-stickers",
    details: {
      company: "Personal concept",
      companyHref: "https://github.com/artew07/tg-attach-stickers",
      description:
        "Rebuilt Telegram’s iOS chat in UIKit and explored a quicker way to send stickers: press, slide, release. A long press on the sticker button fans out four choices; releasing on one sends it straight into the chat. Built with Codex.",
      period: "2026",
      role: "Design Engineer",
      showMetadata: false,
      title: "Quick stickers for Telegram on iPhone",
    },
    title: "Quick stickers for Telegram on iPhone",
  },
  {
    cover: {
      src: "/videos/freelance_tracker_demo_2.mp4",
      type: "video",
      variant: "freelance-tracker",
    },
    description:
      "A personal macOS app for freelance work that brings time, project rates, and earnings into one place — making workload and monthly income easier to plan with confidence.",
    id: "freelance-tracker",
    title: "Personal freelance tracker",
  },
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
    details: {
      company: "Steamify",
      companyHref: "https://steamify.io/cashout/cs2",
      description:
        "Designed the product from scratch and helped scale it to 50K MAU. Reworked the mobile-first cashout flow and connected it to a Telegram bot, increasing web-to-Telegram CTR from 20% to 50%.",
      period: "2024–2025",
      role: "Product Designer",
      title: "Mobile cashout service for in-game assets",
    },
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
    description:
      "An interactive card experiment that explores how Paper Shaders can turn a familiar payment surface into a tactile, playful object.",
    id: "mesh-card-demo",
    title: "Interactive bank card built with Paper Shaders",
  },
  {
    cover: { alt: "", height: 1393, src: "/images/loop_case.png?v=20260706-2", type: "image", variant: "loop", width: 2544 },
    description:
      "A UI exploration for supervising AI agents — designed to make parallel runs, statuses, and handoffs easy to scan at a glance.",
    id: "steamify-case-2",
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
    details: {
      company: "Animator",
      companyHref: "https://getanimator.xyz/",
      description:
        "Designed and built Animator from scratch — a browser-based tool for creating seamless carousels.",
      descriptionLink: {
        href: "https://youtu.be/d9Nve2VaHQ4?si=Jy_Wdt_buRd10kKW",
        label: "Watch how I built it",
      },
      period: "2026",
      role: "Product Designer & Developer",
      title: "Browser-based tool for seamless carousels",
    },
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
    details: {
      company: "Safe {Wallet}",
      companyHref: "https://safe.global/",
      description:
        "Designed and evolved an open-source design system for Safe, creating reusable foundations and components used by 1,500+ people. The release received 85+ likes on Figma Community and reached 33,000 people on X.",
      period: "2023",
      role: "Product Designer",
      title: "Open-source design system used by 1,500+ people",
    },
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
    details: {
      company: "Steamify",
      companyHref: "https://steamify.io/cashout/cs2",
      description:
        "Designed a centralized dashboard for managing Steam trading operations, bringing inventory, listings, and transactions into one workspace.",
      period: "2023",
      role: "Product Designer",
      title: "Steam trading management dashboard",
    },
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
    details: {
      company: "Playdex",
      description:
        "Designed a Web3 NFT marketplace for gamers in Asia, making it easier to discover and rent in-game assets.",
      period: "2023",
      role: "Product Designer",
      title: "Web3 NFT marketplace for gamers in Asia",
    },
    title: "Web3 NFT marketplace for gamers in Asia",
  },
  {
    cover: { mobileSrc: "/videos/Mobile_CCP_2_Animation_Compress.mp4", src: "/videos/Desktop_CCP_2_Animation_Compress.mp4", type: "video", variant: "ccp" },
    id: "s7-case",
    details: {
      company: "KOTELOV",
      companyHref: "https://kotelov.com/",
      description:
        "Flight attendants spent 30–60 minutes after each flight completing paper documentation by hand. I designed an offline iPad workflow that reduced this to 5 minutes, with over 60% of tasks now completed directly in the app.",
      period: "2020",
      role: "Product Designer",
      title: "Offline iPad app for flight attendants",
    },
    title: "Offline iPad app for flight attendants",
  },
  {
    cover: { type: "phantom-glow" },
    description:
      "A motion and lighting study that uses a responsive glow to give the Phantom mark depth, focus, and a sense of movement.",
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
          ({ accent, cover, description, details, href, id, metadata, metadataLinks, title, titleLink }) => (
            <PortfolioCase
              accent={accent}
              caseId={id}
              cover={cover}
              description={description}
              details={details}
              href={href}
              key={id}
              metadata={metadata}
              metadataLinks={metadataLinks}
              title={title}
              titleLink={titleLink}
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
                "case-study": renderWork([
                  "steamify-case",
                  "orbit",
                  "ccp-design-system",
                  "northstar",
                  "s7-case",
                ]),
                favourites: renderWork([
                  "telegram-quick-stickers",
                  "animator",
                  "steamify-case",
                  "s7-case",
                ]),
                "my-products": renderWork(["animator"]),
                craft: renderWork([
                  "telegram-quick-stickers",
                  "freelance-tracker",
                  "mesh-card-demo",
                  "steamify-case-2",
                  "glow-hover-effect",
                ]),
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
          {DebugPanel ? <DebugPanel cases={portfolioCases.map(({ id, title }) => ({ id, label: title || id }))} /> : null}
        </PortfolioTabsProvider>
      </SoundProvider>
    </main>
  );
}
