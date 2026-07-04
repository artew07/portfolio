import Image from "next/image";
import localFont from "next/font/local";
import styles from "./page.module.css";
import { ACTIVE_HEADING_VERSION } from "./heading-version.mjs";
import { VariableWord } from "./variable-word";

const testFamily = localFont({
  src: "../../public/font/Test Family/TestFamily-Regular.otf",
  display: "swap",
  style: "normal",
  weight: "400",
});

export function HeroHeading() {
  if (ACTIVE_HEADING_VERSION === "plain") {
    return (
      <h1 className={testFamily.className}>
        Software designer focused
        <br />
        on B2C web and mobile products
      </h1>
    );
  }

  return (
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
  );
}
