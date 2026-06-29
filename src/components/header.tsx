"use client";

import { useLanguage, type Language } from "@/components/language-provider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type HeaderSection = "work" | "tools" | "about";

type HeaderProps = {
  active?: HeaderSection;
  homeHref?: string;
  workHref?: string;
};

type SidebarItemProps = {
  active?: boolean;
  children: ReactNode;
  href: string;
  icon?: ReactNode;
};

function SidebarItem({
  active = false,
  children,
  href,
  icon,
}: SidebarItemProps) {
  return (
    <a
      className={
        active
          ? "flex h-8 w-full items-center justify-between rounded-md bg-white text-sm font-medium text-[#151313]"
          : "flex h-8 w-full items-center justify-between rounded-md text-sm font-medium text-[#9195a1] transition-colors hover:text-[#151313]"
      }
      href={href}
    >
      <span>{children}</span>
      {icon ? (
        <span className="ml-2 flex size-4 shrink-0 items-center justify-center">
          {icon}
        </span>
      ) : null}
    </a>
  );
}

const headerCopy = {
  eng: {
    work: "Work",
    tools: "Tools",
    about: "About me",
    cv: "CV",
    bookCall: "Book a call",
    message: "Message me",
    language: "Language",
  },
  ru: {
    work: "Работы",
    tools: "Инструменты",
    about: "Обо мне",
    cv: "CV",
    bookCall: "Созвон",
    message: "Написать",
    language: "Язык",
  },
} satisfies Record<Language, Record<string, string>>;

export function Header({
  active = "work",
  homeHref = "/",
  workHref = "/#work",
}: HeaderProps) {
  const { language, setLanguage } = useLanguage();
  const copy = headerCopy[language];

  return (
    <header className="sticky top-0 h-screen w-[160px] shrink-0 border-r border-black/[0.04] bg-white/90 px-4 py-[120px] backdrop-blur-2xl">
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col gap-8">
          <a className="flex items-center gap-2" href={homeHref} aria-label="Home">
            <span className="h-2 w-4 shrink-0 rounded-full bg-[#1a1a1a]" />
            <span className="text-[15px] font-medium leading-[18px] text-[#1a1a1a]">
              Artem Suslov
            </span>
          </a>

          <nav className="flex w-full flex-col items-stretch gap-1 text-sm font-medium">
            <SidebarItem active={active === "work"} href={workHref}>
              {copy.work}
            </SidebarItem>
            <SidebarItem active={active === "tools"} href="/tools">
              {copy.tools}
            </SidebarItem>
            <SidebarItem active={active === "about"} href="/about">
              {copy.about}
            </SidebarItem>
            <SidebarItem
              href="/cv"
              icon={
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4"
                  strokeWidth={1.75}
                />
              }
            >
              {copy.cv}
            </SidebarItem>
          </nav>
        </div>

        <div className="flex flex-col items-start gap-2">
          <Tabs
            aria-label={copy.language}
            className="w-full"
            onValueChange={(value) => setLanguage(value as Language)}
            value={language}
          >
            <TabsList className="w-full">
              {(["eng", "ru"] as const).map((option) => (
                <TabsTrigger key={option} value={option}>
                  {option === "eng" ? "ENG" : "RU"}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <a
            className="hidden h-9 items-center rounded-lg border border-[#e3e3e8] px-3 text-sm font-medium text-[#1a1a1a]"
            href="mailto:asuslov4242@gmail.com"
          >
            {copy.bookCall}
          </a>
        </div>
      </div>
    </header>
  );
}
