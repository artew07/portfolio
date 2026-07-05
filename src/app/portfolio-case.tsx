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
      preload?: boolean;
      sizes?: string;
    }
  | {
      type: "video";
      src: string;
      variant: "loop";
    };

interface PortfolioCaseProps {
  accent?: string;
  caseId: string;
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
  caseId,
  centeredTitle = false,
  cover,
  title = false,
}: PortfolioCaseProps) {
  return (
    <article className={styles.case} data-case-id={caseId}>
      {cover.type === "interactive-card" ? (
        <div
          className={`${styles.caseVisual} ${styles.interactiveCaseVisual}`}
          data-debug-frame
        >
          <div className={styles.interactiveCaseMedia} data-debug-media>
            <InteractiveCardCover />
          </div>
        </div>
      ) : cover.type === "video" ? (
        <div className={styles.caseVisual} data-debug-frame>
          <video
            aria-hidden="true"
            autoPlay
            className={`${styles.caseVideo} ${styles.loopCaseVideo}`}
            data-debug-media
            loop
            muted
            playsInline
            preload="metadata"
            src={cover.src}
          />
        </div>
      ) : (
        <div
          className={`${styles.caseVisual} ${
            cover.variant === "s7" || cover.variant === "safe"
              ? styles.caseVisualFlushBottom
              : ""
          }`}
          data-debug-frame
        >
          <Image
            alt={cover.alt}
            className={`${styles.caseImage} ${caseImageClassNames[cover.variant]}`}
            data-debug-media
            height={cover.height}
            preload={cover.preload}
            sizes={
              cover.sizes ??
              "(max-width: 760px) calc(100vw - 40px), 636px"
            }
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
                  src="/svg/underline_small.webp"
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
