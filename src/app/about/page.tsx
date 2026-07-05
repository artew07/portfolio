"use client";

import { Footer } from "@/components/footer";
import { PageShell } from "@/components/page-shell";
import { useLanguage, type Language } from "@/components/language-provider";
import { Send } from "lucide-react";
import Image from "next/image";

const aboutCopy = {
  eng: {
    message: "Message me",
    bookCall: "Book a call",
    portraitAlt: "Blue-toned sketch portrait of Artem Suslov",
    title: "Hello, that's me",
    paragraphs: [
      "I've been passionate about design since I was 19, when I realized that studying to become a mining engineer wasn't something I truly enjoyed. Since then, I've been able to spend entire days moving pixels and polishing the same elements over and over again, because design is the kind of work where I completely lose track of time. That's why I chose this profession - I haven't found the same level of immersion and interest anywhere else.",
      "In 2026, a lot is changing due to AI technologies. I believe that people in our field and related IT professions shouldn't resist progress but move with it. Otherwise, it's easy to fall behind the market and become irrelevant.",
      "That's why this year I'm dedicating a lot of time to AI tools and coding with products like Codex and Claude. I also believe that sooner or later a tool will emerge that truly bridges the gap between design and development. Right now, AI slop affects everyone, and it's one of the most pressing problems in the industry.",
      "In my free time, I enjoy playing chess and want to reach 800 Elo by the end of the year. I also like playing Counter-Strike 2, playing tennis, and going to the gym.",
    ],
    signature: ["Wish you best,", "Artem"],
  },
  ru: {
    message: "Написать",
    bookCall: "Созвон",
    portraitAlt: "Синий скетч-портрет Артема Суслова",
    title: "Привет, это я",
    paragraphs: [
      "Я увлекся дизайном в 19 лет, когда понял, что учеба на горного инженера - это не то, чем я действительно хочу заниматься. С тех пор я могу целыми днями двигать пиксели и полировать одни и те же элементы, потому что дизайн - это работа, в которой я полностью теряю счет времени. Поэтому я и выбрал эту профессию: такого же уровня вовлечения и интереса я больше нигде не находил.",
      "В 2026 году многое меняется из-за AI-технологий. Я считаю, что людям из нашей сферы и смежных IT-профессий не стоит сопротивляться прогрессу - с ним нужно двигаться. Иначе легко отстать от рынка и потерять актуальность.",
      "Поэтому в этом году я много времени уделяю AI-инструментам и кодингу с продуктами вроде Codex и Claude. Еще я верю, что рано или поздно появится инструмент, который по-настоящему соединит дизайн и разработку. Сейчас AI slop затрагивает всех, и это одна из самых заметных проблем индустрии.",
      "В свободное время я играю в шахматы и хочу дойти до 800 Elo к концу года. Еще люблю Counter-Strike 2, теннис и тренировки в зале.",
    ],
    signature: ["С лучшими пожеланиями,", "Артем"],
  },
} satisfies Record<Language, {
  message: string;
  bookCall: string;
  portraitAlt: string;
  title: string;
  paragraphs: string[];
  signature: string[];
}>;

export default function AboutPage() {
  const { language } = useLanguage();
  const copy = aboutCopy[language];

  return (
    <main className="min-h-screen bg-white text-[#1a1a1a]">
      <PageShell active="about">
        <section className="px-5 pb-14 pt-[128px] sm:px-8 lg:min-h-[899px]">
          <div className="mx-auto flex max-w-[600px] flex-col gap-10 overflow-hidden">
            <div className="relative aspect-[0.666/1] w-full shrink-0 overflow-hidden rounded-md bg-[#f7f7f8] lg:w-[344px]">
              <Image
                alt={copy.portraitAlt}
                className="object-cover object-[50%_20%]"
                fill
                sizes="(max-width: 640px) calc(100vw - 40px), 344px"
                src="/images/about-portrait.webp"
              />
            </div>

            <div className="flex flex-1 flex-col gap-10">
              <div className="flex flex-col gap-4">
                <h1 className="text-[30px] font-medium leading-9 tracking-[-0.02em] text-[#1a1a1a]">
                  {copy.title}
                </h1>

                <div className="flex flex-col gap-5 text-[15px] leading-[22.5px] tracking-normal text-[#595d69]">
                  {copy.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    className="flex h-9 items-center gap-2 rounded-[9px] border border-[#2b8bff] bg-gradient-to-b from-[#6cb0ff] to-[#1678f3] px-3 text-sm font-medium text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]"
                    href="https://t.me/art_ew"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Send aria-hidden="true" className="size-4" strokeWidth={1.75} />
                    {copy.message}
                  </a>
                  <a
                    className="flex h-9 items-center rounded-lg border border-[#e3e3e8] px-3 text-sm font-medium text-[#1a1a1a]"
                    href="mailto:asuslov4242@gmail.com"
                  >
                    {copy.bookCall}
                  </a>
                </div>
              </div>

              <div className="flex flex-col items-start gap-2">
                <div className="font-serif text-[38px] italic leading-10 text-[#1a1a1a]">
                  AS
                </div>
                <div className="text-[10px] italic leading-4 text-[#595d69]">
                  {copy.signature.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </PageShell>
    </main>
  );
}
