import localFont from "next/font/local";
import styles from "./page.module.css";
import { ContactButton } from "./contact-button";
import { HeroVideo } from "./hero-video";
import { ResumeButton } from "./resume-button";
import { SoundToggleButton } from "./sound-toggle-button";
import { V2Description } from "./v2-description";

const testFamily = localFont({
  src: "../../public/font/Test Family/TestFamily-Regular.otf",
  display: "swap",
  style: "normal",
  weight: "400",
});

export function V2Hero({ showDivider = true }: { showDivider?: boolean }) {
  return (
    <header className={styles.v2Hero}>
      <div className={styles.v2Toolbar}>
        <HeroVideo className={styles.v2HeroVideo} />
        <SoundToggleButton className={styles.iconButton} />
      </div>
      <div className={styles.v2Content}>
        <p className={styles.v2Name}>Artem Suslov</p>
        <h1 className={testFamily.className}>
          Software designer focused on B2C{" "}
          <br className={styles.v2DesktopBreak} />
          products for web and mobile
        </h1>
        <V2Description />
        <div className={styles.v2Actions}>
          <ResumeButton className={styles.v2ResumeButton} />
          <ContactButton className={styles.v2ContactButton} />
        </div>
      </div>
      {/* Temporarily hidden on the main V2 route. Restore when requested. */}
      {showDivider ? <span className={styles.v2Divider} aria-hidden="true" /> : null}
    </header>
  );
}
