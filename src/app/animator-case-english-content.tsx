"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { InlineLink } from "./inline-link";
import { mediaUrl } from "./media";
import { useInteractionSound } from "./sound-provider";
import styles from "./animator-case.module.css";

const imagePath = mediaUrl("/images/animator-case");
const logoPath = "/images/animator-case/logo.svg";

function CaseImage({ alt, name }: { alt: string; name: string }) {
  return <Image alt={alt} className={styles.media} height={1192} src={`${imagePath}/${name}`} width={2032} />;
}

export function AnimatorCaseContent() {
  const { playTap } = useInteractionSound();

  return (
    <main className={styles.page}>
      <article className={styles.caseStudy}>
        <section className={styles.intro}>
          <Link className={styles.backButton} href="/" onClick={playTap}>
            <ChevronLeft aria-hidden="true" size={16} strokeWidth={1.5} />
            Back
          </Link>
          <div className={styles.productName}>
            <Image alt="Animator" height={20} src={logoPath} width={20} />
            <span>Animator</span>
          </div>
          <h1>Creating ready-to-use looping MP4 showcases</h1>
          <p className={styles.lede}>Animator is a web tool for uploading a set of images, choosing a motion preset, and quickly exporting a looping carousel as an MP4.</p>
          <video autoPlay className={styles.heroVideo} loop muted playsInline poster={`${imagePath}/03.png`}>
            <source src={mediaUrl("/videos/animator_demo.faststart.mp4")} type="video/mp4" />
          </video>
        </section>

        <section className={styles.section}>
          <p className={styles.eyebrow}>Context</p>
          <h2>I often edit videos for YouTube and create posts for Telegram</h2>
          <p>I need visually engaging looping galleries to showcase interface screens in motion. They make product moments easier to understand and give video and social content a more polished feel.</p>
        </section>

        <section className={styles.section}>
          <p className={styles.eyebrow}>Problem</p>
          <h2>Creating those looping galleries manually took too long</h2>
          <p>Static screenshots were not enough, but manually animating screens in Figma Motion, After Effects, or a video editor took too much time.</p>
          <p>I wanted a simple tool: upload screens, choose a motion preset, and immediately get a finished looping MP4.</p>
        </section>

        <section className={styles.section}>
          <p className={styles.eyebrow}>Process</p>
          <h2>01. I started by limiting the MVP</h2>
          <p>The main mistake in projects like this is trying to build a full video editor from day one. So I started with the core flow:</p>
          <p className={styles.emphasis}>Upload images → adjust motion → export MP4.</p>
          <p>Before development, I mapped the flow. It helped separate essential features from later additions: motion presets, screen spacing, speed, easing, quality, and frame rate.</p>
          <CaseImage alt="Animator core flow diagram" name="03.png" />
          <p>At launch, I deliberately left out advanced formats, dozens of presets, project saving, and other secondary features.</p>
        </section>

        <section className={styles.section}>
          <h2>02. The first version: function before polish</h2>
          <p>I built the first prototype with Codex. In the initial prompt, I included the flow diagram, described the problem and the expected solution. I pictured the product as a studio: presets on the left, video preview in the center, and a settings panel on the right.</p>
          <CaseImage alt="The first Animator interface" name="04.png" />
          <p>The first version looked rough: overly bright colors, simple controls, and an imperfect composition. But it already solved the core task: users could upload images, preview the animation, and export a video.</p>
          <p>Rendering happens entirely in the browser. Canvas assembles the animation frame by frame, WebCodecs encodes those frames, and mp4-muxer packages them into an MP4. Images never need to be sent to a separate rendering server.</p>
        </section>

        <section className={styles.section}>
          <h2>The editing panel</h2>
          <p>I experimented with the right-side panel. First, I used <InlineLink href="https://joshpuckett.me/dialkit">DialKit</InlineLink>, a library for tuning animation parameters. It quickly provided working controls, but the panel itself was too large and did not adapt well to my interface.</p>
          <p>Then I tried building the controls from custom components. They felt disconnected, though, and polishing the interaction would have taken too much time.</p>
          <p>I eventually found <InlineLink href="https://toolcraft.sh/">ToolCraft</InlineLink>. Its sliders, selects, and other controls were flexible enough to create a more compact and cohesive editing panel.</p>
          <div className={styles.mediaTriptych}>
            <Image alt="Animator settings" height={298} src={`${imagePath}/01.png`} width={508} />
            <Image alt="Animator settings" height={298} src={`${imagePath}/02.png`} width={508} />
            <Image alt="Animator settings" height={298} src={`${imagePath}/05.png`} width={495} />
          </div>
        </section>

        <section className={styles.section}>
          <h2>03. A little Figma before the prompts</h2>
          <p>Over time, I realised it was inefficient to explain visual direction to Codex through long prompts: colors, typography, sizes, and layout.</p>
          <p>So I quickly made a rough layout in Figma using another file with existing color tokens, type styles, and components. I then passed that layout to Codex through Figma MCP.</p>
          <CaseImage alt="Animator Figma layout" name="06.png" />
          <p>That gave the agent a clear visual direction and saved me dozens of messages about minor refinements.</p>
        </section>

        <section className={styles.section}>
          <h2>04. Interface and presets</h2>
          <p>After the first version, I reworked the editor structure.</p>
          <p>The left panel gained presets with previews, so users could understand the result before choosing an animation.</p>
          <p>I moved image uploads and background controls to the right panel. I also added ready-made wallpapers, an iPhone format, and automatic corner rounding so mobile screens looked natural immediately.</p>
          <p>I limited shadow selection to a few clear options. It is a small decision, but it keeps the interface from becoming unnecessarily complex.</p>
          <CaseImage alt="Updated Animator interface" name="07.png" />
        </section>

        <section className={styles.section}>
          <p className={styles.eyebrow}>What I learned</p>
          <h2>05. Authentication with Supabase and Resend</h2>
          <p>Initially, I put authentication before the product. Users could not upload images or preview animation until they entered an email address.</p>
          <p>It worked technically, but it was a weak product decision. Because the service was new and unfamiliar, I was blocking users from the first useful interaction with an authentication screen.</p>
          <p>I changed the flow. Users can explore the interface and try the basic path without signing in. Authentication is only required before export or feedback submission.</p>
          <p>For sign-in, I chose Magic Link: a user enters an email address, receives a link, and signs in without a password. <InlineLink href="https://supabase.com/">Supabase</InlineLink> handles authentication and data storage, while Resend delivers email through the configured mail service.</p>
          <Image alt="Authentication screen comparison" className={styles.media} height={298} src={`${imagePath}/08.png`} width={508} />
        </section>

        <section className={styles.section}>
          <p className={styles.eyebrow}>Trade-offs</p>
          <h2>06. Decisions I chose not to pursue</h2>
          <p>I considered adding WebM as a second export format. It is often smaller and well suited to the web, but it would have introduced more technical details and test cases to the first version.</p>
          <p>So I kept MP4 only. It is familiar to most users and solves the core problem. WebM can return later, once the primary flow is stable.</p>
          <p>The control panel followed a similar path. I tried an off-the-shelf library and then custom components. Both approaches made the interface feel too heavy, so I stopped polishing endlessly, rebuilt the panel, and chose a simpler set of controls.</p>
        </section>

        <section className={styles.section}>
          <h2>07. What was harder than expected</h2>
          <p>The most surprising work was not the animation itself, but the infrastructure around it.</p>
          <p>Default email delivery had limits, and some messages from the new domain landed in spam. I had to buy a domain, configure DNS records, and connect <InlineLink href="https://resend.com/">Resend</InlineLink> as a separate SMTP service.</p>
        </section>

        <section className={styles.section}>
          <h2>08. The outcome</h2>
          <p>In the end, I built a working web service that lets people:</p>
          <ul>
            <li>Upload interface screenshots</li>
            <li>Choose a motion preset</li>
            <li>Adjust animation parameters</li>
            <li>Preview the result on the canvas</li>
            <li>Export an MP4 video</li>
            <li>Leave feedback inside the product</li>
          </ul>
          <p>The service is deployed on its own domain and is already part of my video-making workflow.</p>
        </section>

        <section className={styles.section}>
          <h2>What I learned</h2>
          <ul>
            <li>For the first time, I used AI to build working authentication with users stored in a database.</li>
            <li>I implemented Magic Link sign-in and configured my own SMTP server through Resend.</li>
            <li>I brought in the first 300 users in three days through my own YouTube, Telegram, Threads, and LinkedIn channels.</li>
          </ul>
        </section>
      </article>
    </main>
  );
}
