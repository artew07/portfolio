import Image from "next/image";
import { InteractiveCardCover } from "@/components/interactive-card-cover";
import styles from "./page.module.css";

type CaseImageVariant = "steamify" | "loop" | "s7" | "safe";

type CaseCover =
  | {
      type: "interactive-card";
    }
  | {
      type: "image";
      src: string;
      alt: string;
      width: number;
      height: number;
      variant: CaseImageVariant;
      sizes?: string;
    }
  | {
      type: "video";
      src: string;
    };

interface PortfolioCaseProps {
  accent?: string;
  centeredTitle?: boolean;
  cover: CaseCover;
  title?: string | false;
}

const caseImageClassNames: Record<CaseImageVariant, string> = {
  steamify: styles.steamifyCaseImage,
  loop: styles.loopCaseImage,
  s7: styles.s7CaseImage,
  safe: styles.safeCaseImage,
};

export function PortfolioCase({
  accent,
  centeredTitle = false,
  cover,
  title = false,
}: PortfolioCaseProps) {
  return (
    <article className={styles.case}>
      {cover.type === "interactive-card" ? (
        <div
          className={`${styles.caseVisual} ${styles.interactiveCaseVisual}`}
        >
          <InteractiveCardCover />
        </div>
      ) : cover.type === "video" ? (
        <video
          aria-hidden="true"
          autoPlay
          className={styles.caseVideo}
          loop
          muted
          playsInline
          preload="metadata"
          src={cover.src}
        />
      ) : (
        <div className={styles.caseVisual}>
          <Image
            alt={cover.alt}
            className={`${styles.caseImage} ${caseImageClassNames[cover.variant]}`}
            height={cover.height}
            sizes={cover.sizes}
            src={cover.src}
            width={cover.width}
          />
        </div>
      )}

      {title ? (
        <span
          className={
            centeredTitle ? styles.secondCaseTitle : styles.caseTitle
          }
        >
          {title}
          {accent ? (
            <>
              {" "}
              <span className={styles.caseMetric}>
                {accent}
                <Image
                  aria-hidden="true"
                  alt=""
                  className={styles.caseMetricUnderline}
                  height={6}
                  src="/svg/underline_small.svg"
                  unoptimized
                  width={87}
                />
              </span>
            </>
          ) : null}
        </span>
      ) : null}
    </article>
  );
}
