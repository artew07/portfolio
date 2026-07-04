import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedTabs } from "@/components/ui/animated-tabs";
import styles from "./page.module.css";
import { HeroHeading } from "./hero-heading";
import { PortfolioCase } from "./portfolio-case";
import { VerticalRuler } from "./vertical-ruler";

export const metadata: Metadata = {
  title: "Artem Suslov — Software Designer",
  description: "Software designer focused on B2C web and mobile products.",
};

const workTabs = [
  { id: "all", label: "All" },
  { id: "case-study", label: "Case Study" },
  { id: "concepts", label: "Concepts" },
];

const portfolioCases: Array<{
  accent?: string;
  href: string;
  title: string;
  videoSrc: string;
}> = [
  {
    accent: "20% to 50%",
    href: "#steamify-case",
    title: "How I increased CTR Web-to-Telegram button from",
    videoSrc: "/videos/steamify_demo.mp4",
  },
  {
    href: "#steamify-case-2",
    title: "Managing end-to-end AI agents",
    videoSrc: "/videos/aiagents_demo.mp4",
  },
  {
    href: "#steamify-case-3",
    title: "Open source design system for Safe{Wallet} with 1400 users",
    videoSrc: "/videos/steamify_demo.mp4",
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
        <header className={styles.intro}>
          <video
            aria-hidden="true"
            autoPlay
            className={styles.portraitVideo}
            loop
            muted
            playsInline
            preload="metadata"
            src="/videos/me_video_2.mp4"
          />
          <div className={styles.introCopy}>
            <p className={styles.name}>Artem Suslov</p>
            <HeroHeading />
          </div>
          <AnimatedTabs defaultTab="all" tabs={workTabs} />
        </header>

        <section className={styles.work} id="work" aria-label="Selected work">
          {portfolioCases.map(({ accent, href, title, videoSrc }) => (
            <PortfolioCase
              accent={accent}
              cover={{ type: "video", src: videoSrc }}
              href={href}
              key={href}
              title={title}
            />
          ))}
        </section>

        <span className={styles.anchor} id="tools" aria-hidden="true" />
        <span className={styles.anchor} id="steamify-case" aria-hidden="true" />
        <span className={styles.anchor} id="steamify-case-2" aria-hidden="true" />
        <span className={styles.anchor} id="steamify-case-3" aria-hidden="true" />
      </article>
    </main>
  );
}
