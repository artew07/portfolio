import Image from "next/image";
import styles from "./page.module.css";

interface InlineImageProps {
  alt: string;
  grouped?: boolean;
  src: string;
}

function InlineImage({ alt, grouped = false, src }: InlineImageProps) {
  return (
    <Image
      alt={alt}
      className={`${styles.aboutInlineImage} ${
        grouped ? styles.aboutInlineImageGrouped : ""
      }`}
      height={20}
      sizes="20px"
      src={src}
      width={20}
    />
  );
}

export function AboutMeContent() {
  return (
    <section className={styles.aboutContent} aria-label="About me">
      <p>
        I&apos;ve been designing digital products for over{" "}
        <strong>5 years,</strong> with a primary focus on{" "}
        <span className={styles.aboutInlineGroup}>
          <InlineImage
            alt="People using digital products"
            grouped
            src="/images/About_me/users.png"
          />
          B2C
        </span>{" "}
        web and mobile applications.
      </p>

      <p>
        I actively keep up with the latest trends in
        <InlineImage alt="Color palette" src="/images/About_me/palette.png" />
        product design,
        <InlineImage alt="AI" src="/images/About_me/ai-stars.png" />
        AI, and emerging technologies, constantly exploring new tools and
        workflows to improve the way digital products are built.
      </p>

      <p>
        Beyond my day-to-day work, I create content about product design and AI
        on my{" "}
        <a
          className={styles.aboutInlineLink}
          href="https://www.youtube.com/@artem_uxdesign"
          rel="noreferrer"
          target="_blank"
        >
          <InlineImage
            alt=""
            grouped
            src="/images/About_me/youtube.svg"
          />
          <strong>YouTube,</strong>
        </a>{" "}
        where I share practical insights, experiments, and my perspective on
        how the industry is evolving. I also run a{" "}
        <a
          className={styles.aboutInlineLink}
          href="https://t.me/artem_designich"
          rel="noreferrer"
          target="_blank"
        >
          <InlineImage
            alt=""
            grouped
            src="/images/About_me/telegram.svg"
          />
          <strong>Telegram channel</strong>
        </a>{" "}
        for designers and tech enthusiasts.
      </p>

      <p>
        Outside of work, I enjoy playing
        <InlineImage alt="Tennis" src="/images/About_me/tennis.png" />
        tennis, going to the
        <InlineImage alt="Gym" src="/images/About_me/gym.png" />
        gym, and competing
        <br />
        <span className={styles.aboutInlineGroup}>
          <InlineImage alt="Gaming PC" grouped src="/images/About_me/pc.png" />
          in Counter-Strike 2.
        </span>
      </p>
    </section>
  );
}
