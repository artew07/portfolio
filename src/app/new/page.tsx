import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { VariableWord } from "./variable-word";
import { VerticalRuler } from "./vertical-ruler";

export const metadata: Metadata = {
  title: "Artem Suslov — Software Designer",
  description: "Software designer focused on B2C web and mobile products.",
};

const caseTitle =
  "How I increased CTR Web-to-Telegram button from 20% to 50%";

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
          <p className={styles.name}>Artem Suslov</p>
          <h1>
            Software <VariableWord word="designer" /> focused
            <br />
            on{" "}
            <span className={styles.accentText}>
              B2C web and mobile
              <Image
                aria-hidden="true"
                className={styles.accentUnderline}
                src="/svg/underline_big.svg"
                width={245}
                height={9}
                alt=""
                unoptimized
              />
            </span>{" "}
            products
          </h1>
        </header>

        <section className={styles.work} id="work" aria-label="Selected work">
          <a className={styles.case} href="#steamify-case">
            <span className={styles.emptyCaseVisual} aria-hidden="true" />
            <span className={styles.caseTitle}>
              How I increased CTR Web-to-Telegram button from{" "}
              <span className={styles.caseMetric}>
                20% to 50%
                <Image
                  aria-hidden="true"
                  className={styles.caseMetricUnderline}
                  src="/svg/underline_small.svg"
                  width={87}
                  height={6}
                  alt=""
                  unoptimized
                />
              </span>
            </span>
          </a>

          <a className={styles.case} href="#design-system-case">
            <Image
              className={styles.caseImage}
              src="/new/design-system.png"
              width={1272}
              height={698}
              sizes="(max-width: 760px) calc(100vw - 64px), 636px"
              alt="Dark design system boards for alerts and table rows"
            />
            <span className={styles.secondCaseTitle}>{caseTitle}</span>
          </a>
        </section>

        <span className={styles.anchor} id="tools" aria-hidden="true" />
        <span className={styles.anchor} id="steamify-case" aria-hidden="true" />
        <span
          className={styles.anchor}
          id="design-system-case"
          aria-hidden="true"
        />
      </article>
    </main>
  );
}
