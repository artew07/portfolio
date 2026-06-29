"use client";

import { useLanguage, type Language } from "@/components/language-provider";
import { ArrowUpRight, Send } from "lucide-react";

const footerCopy = {
  eng: {
    available: "Available for new projects",
    title: "Think of all the sick projects we could create together",
    copyEmail: "Copy Email",
    message: "Message me",
    contacts: [
      ["Telegram (Preferable)", "@art_ew", "https://t.me/art_ew"],
      ["LinkedIn", "Artem Suslov", "https://www.linkedin.com"],
      ["Email", "asuslov4242@gmail.com", "mailto:asuslov4242@gmail.com"],
      ["Layers", "Artem Suslov", "/"],
    ],
  },
  ru: {
    available: "Открыт к новым проектам",
    title: "Представь, сколько сильных проектов мы можем сделать вместе",
    copyEmail: "Скопировать Email",
    message: "Написать",
    contacts: [
      ["Telegram (лучше всего)", "@art_ew", "https://t.me/art_ew"],
      ["LinkedIn", "Artem Suslov", "https://www.linkedin.com"],
      ["Email", "asuslov4242@gmail.com", "mailto:asuslov4242@gmail.com"],
      ["Layers", "Artem Suslov", "/"],
    ],
  },
} satisfies Record<
  Language,
  {
    available: string;
    title: string;
    copyEmail: string;
    message: string;
    contacts: string[][];
  }
>;

type FooterProps = {
  layersHref?: string;
};

export function Footer({ layersHref = "/" }: FooterProps) {
  const { language } = useLanguage();
  const copy = footerCopy[language];
  const contacts = copy.contacts.map(([label, value, href]) => [
    label,
    value,
    label === "Layers" ? layersHref : href,
  ]);

  return (
    <footer
      id="cv"
      className="border-t border-[#f4f4f6] bg-[#0c0d0d] px-5 pb-14 pt-16 text-white sm:px-8"
    >
      <div className="mx-auto flex max-w-[600px] flex-col gap-8">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <span className="h-2 w-4 rounded-full bg-[#16e090]" />
            <p className="text-[15px] leading-[22.5px]">{copy.available}</p>
          </div>
          <div className="flex flex-col gap-8">
            <h2 className="max-w-full text-[40px] font-medium leading-[1.1] tracking-[-0.01em] sm:text-[42px]">
              {copy.title}
            </h2>
            <div className="flex gap-2">
              <a
                className="flex h-9 items-center rounded-lg border border-white/20 px-3 text-sm font-medium"
                href="mailto:asuslov4242@gmail.com"
              >
                {copy.copyEmail}
              </a>
              <a
                className="flex h-9 items-center gap-2 rounded-lg bg-white px-3 text-sm font-medium text-[#1a1a1a]"
                href="https://t.me/art_ew"
                target="_blank"
                rel="noreferrer"
              >
                <Send aria-hidden="true" className="size-4" strokeWidth={1.75} />
                {copy.message}
              </a>
            </div>
          </div>
          <div className="h-px w-full bg-[#181b1b]" />
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {contacts.map(([label, value, href]) => (
            <a className="flex flex-col gap-1" href={href} key={label}>
              <span className="text-sm leading-5 text-[#9195a1]">{label}</span>
              <span className="flex items-center gap-0.5 text-[15px] leading-5 text-white">
                {value}
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4"
                  strokeWidth={1.75}
                />
              </span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
