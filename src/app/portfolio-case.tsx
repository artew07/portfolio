import Image from "next/image";
import type { StaticImageData } from "next/image";
import { Fragment } from "react";
import { InteractiveCardCover } from "@/components/interactive-card-cover";
import { DashboardCasePreview } from "./dashboard-case-preview";
import styles from "./page.module.css";

type CaseImageVariant = "steamify" | "loop" | "ccp" | "safe";

type CaseCover =
  | {
      type: "interactive-card";
    }
  | {
      type: "image";
      src: string | StaticImageData;
      alt: string;
      eager?: boolean;
      width: number;
      height: number;
      variant: CaseImageVariant;
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
  metadata?: string[];
  title?: string | false;
}

const caseImageClassNames: Record<CaseImageVariant, string> = {
  steamify: styles.steamifyCaseImage,
  loop: styles.loopCaseImage,
  ccp: styles.ccpCaseImage,
  safe: styles.safeCaseImage,
};

export function PortfolioCase({
  accent,
  caseId,
  centeredTitle = false,
  cover,
  metadata,
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
            cover.variant === "steamify"
              ? styles.steamifyCaseVisual
              : ""
          } ${
            cover.variant === "loop" ? styles.loopCaseVisual : ""
          } ${
            cover.variant === "ccp" ? styles.ccpCaseVisual : ""
          } ${
            cover.variant === "ccp" || cover.variant === "safe"
              ? styles.caseVisualFlushBottom
              : ""
          }`}
          data-debug-frame
        >
          {cover.variant === "loop" ? (
            <DashboardCasePreview
              alt={cover.alt}
              sizes={
                cover.sizes ??
                "(max-width: 760px) calc(100vw - 40px), 512px"
              }
              src={cover.src}
            />
          ) : (
            <Image
              alt={cover.alt}
              className={`${styles.caseImage} ${caseImageClassNames[cover.variant]}`}
              data-debug-media
              height={cover.height}
              loading={cover.eager ? "eager" : undefined}
              sizes={
                cover.sizes ??
                "(max-width: 760px) calc(100vw - 40px), 636px"
              }
              src={cover.src}
              width={cover.width}
            />
          )}
        </div>
      )}

      {title ? (
        <div className={styles.caseCaption}>
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

          {metadata?.length ? (
            <span className={styles.caseMetadata}>
              {metadata.map((item, index) => (
                <Fragment key={item}>
                  {index > 0 ? <span aria-hidden="true">•</span> : null}
                  <span>{item}</span>
                </Fragment>
              ))}
            </span>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
