"use client";

import { CaseCard, type CaseCardData } from "@/components/case-card";
import { BentoGrid } from "@/components/bento-grid";
import { AnimatedTabs } from "@/components/ui/animated-tabs";
import { PageShell } from "@/components/page-shell";
import { useLanguage, type Language } from "@/components/language-provider";
import { DraftingCompass } from "lucide-react";

const projectImages = {
  agents:
    "https://app.paper.design/file-assets/01KRKT3AQCT20NN9QQFQVTYW0X/0MYD132G3ZNVYSRPVA754CFNK5.webp",
  cashout:
    "https://app.paper.design/file-assets/01KRKT3AQCT20NN9QQFQVTYW0X/3SERQHRQATRD812VG7PHTN4PZ8.webp",
  safe:
    "https://app.paper.design/file-assets/01KRKT3AQCT20NN9QQFQVTYW0X/199R9J0NDAZXY831GBZ2PR5NZM.webp",
  trading:
    "https://app.paper.design/file-assets/01KRKT3AQCT20NN9QQFQVTYW0X/4TWQ2DE9H1621J4B9CVYQ0J63B.webp",
};

const homeCopy = {
  eng: {
    available: "Available for new projects",
    heroTitle:
      "I'm Artem, a product designer focused on clean UI, thoughtful UX, and working prototypes. I quickly turn ideas into polished interfaces and working prototypes. I help startups and enterprises shorten the path from idea to final solution while improving quality.",
    work: "Work",
    projects: [
      {
        title: "Managing end-to-end AI agents",
        description:
          "Designing and prototyping how teams run, monitor, and control autonomous agents in real workflows.",
        image: projectImages.agents,
        tags: ["AI", "Vibe Coding", "Research"],
        cta: "Prototype",
      },
      {
        title: "Steamify - Skins Cashout",
        description:
          "A mobile cashout service with 300+ withdrawals per day, designed to convert in-game assets into real money.",
        image: projectImages.cashout,
        tags: ["B2C", "Mobile", "Design System"],
        cta: "Live",
      },
      {
        title: "Safe{Wallet} Design System",
        description:
          "I was invited to help establish a unified design foundation, aligning design and frontend standards while shaping a system that could serve both internal needs and the broader Web3 community.",
        image: projectImages.safe,
        tags: ["Design System", "Web3"],
        cta: "Live",
      },
      {
        title: "Steamify - Trading Bot",
        description:
          "Steamify is a web automation tool for Steam traders, enabling users to buy and sell items, track analytics, set price thresholds, monitor competitor prices, and more.",
        image: projectImages.trading,
        tags: ["B2C", "Web App", "Design System"],
      },
    ],
  },
  ru: {
    available: "Открыт к новым проектам",
    heroTitle:
      "Продуктовый дизайнер для B2B и B2C продуктов: от отполированных интерфейсов до рабочих прототипов",
    work: "Работы",
    projects: [
      {
        title: "Управление AI-агентами end-to-end",
        description:
          "Проектирование и прототипирование того, как команды запускают, мониторят и контролируют автономных агентов в реальных рабочих процессах.",
        image: projectImages.agents,
        tags: ["AI", "AI Coding", "Research"],
        cta: "Prototype",
      },
      {
        title: "Steamify - вывод скинов",
        description:
          "Мобильный cashout-сервис с 300+ выводами в день, который помогает превращать игровые активы в реальные деньги.",
        image: projectImages.cashout,
        tags: ["B2C", "Mobile", "Design System"],
        cta: "Live",
      },
      {
        title: "Safe{Wallet} Design System",
        description:
          "Меня пригласили помочь собрать единую дизайн-основу, синхронизировать дизайн и frontend-стандарты и развить систему для внутренних команд и Web3-сообщества.",
        image: projectImages.safe,
        tags: ["Design System", "Web3"],
        cta: "Live",
      },
      {
        title: "Steamify - Trading Bot",
        description:
          "Веб-инструмент автоматизации для Steam-трейдеров: покупка и продажа предметов, аналитика, ценовые пороги, мониторинг конкурентов и другое.",
        image: projectImages.trading,
        tags: ["B2C", "Web App", "Design System"],
      },
    ],
  },
} satisfies Record<Language, {
  available: string;
  heroTitle: string;
  work: string;
  projects: CaseCardData[];
}>;

const workTabs = [
  { id: "all", label: "All" },
  { id: "case-study", label: "Case Study" },
  { id: "concepts", label: "Concepts" },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="scroll-mt-24" id={children?.toString().toLowerCase()}>
      <div className="flex items-center gap-2">
        <DraftingCompass aria-hidden="true" className="size-4" strokeWidth={1.75} />
        <p className="text-[13px] font-medium leading-[13px] tracking-normal text-[#1a1a1a]">
          {children}
        </p>
      </div>
      <div className="mt-2 h-px w-full bg-[#f4f4f6]" />
    </div>
  );
}

export default function Home() {
  const { language } = useLanguage();
  const copy = homeCopy[language];

  return (
    <main id="top" className="min-h-screen bg-white text-[#1a1a1a]">
      <PageShell active="work" homeHref="#top" workHref="#work">
        <section id="work" className="px-5 pb-16 pt-[120px] sm:px-8">
          <div className="mx-auto max-w-[600px]">
            <h1 className="mb-12 max-w-full font-['Inter_Variable',Arial,sans-serif] text-[20px] font-medium leading-[1.25] tracking-normal text-[#1a1a1a]">
              {copy.heroTitle}
            </h1>
            <SectionLabel>{copy.work}</SectionLabel>
            <div className="mb-12 mt-4">
              <AnimatedTabs defaultTab="all" tabs={workTabs} />
            </div>
            <div className="flex flex-col gap-8">
              {copy.projects.map((project, index) => (
                <div className="contents" key={project.title}>
                  <CaseCard project={project} />
                  {index === 0 ? <BentoGrid /> : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* <Footer layersHref="#top" /> */}
      </PageShell>
    </main>
  );
}
