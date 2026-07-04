import Image from "next/image";
import styles from "./page.module.css";

type CaseCover =
  | {
      type: "image";
      src: string;
      alt: string;
      width: number;
      height: number;
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
  href: string;
  title?: string | false;
}

export function PortfolioCase({
  accent,
  centeredTitle = false,
  cover,
  href,
  title = false,
}: PortfolioCaseProps) {
  return (
    <a className={styles.case} href={href}>
      {cover.type === "video" ? (
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
        <Image
          alt={cover.alt}
          className={styles.caseImage}
          height={cover.height}
          sizes={cover.sizes}
          src={cover.src}
          width={cover.width}
        />
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
    </a>
  );
}
