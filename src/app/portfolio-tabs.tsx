"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import { AnimatedTabs } from "@/components/ui/animated-tabs";

interface Tab {
  id: string;
  label: string;
}

interface PortfolioTabsContextValue {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}

const PortfolioTabsContext =
  createContext<PortfolioTabsContextValue | null>(null);

function usePortfolioTabs() {
  const context = useContext(PortfolioTabsContext);

  if (!context) {
    throw new Error(
      "Portfolio tab components must be used inside PortfolioTabsProvider.",
    );
  }

  return context;
}

export function PortfolioTabsProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState("all");
  const value = useMemo(
    () => ({ activeTab, setActiveTab }),
    [activeTab],
  );

  return (
    <PortfolioTabsContext.Provider value={value}>
      {children}
    </PortfolioTabsContext.Provider>
  );
}

export function PortfolioTabList({ tabs }: { tabs: Tab[] }) {
  const { setActiveTab } = usePortfolioTabs();

  return (
    <AnimatedTabs defaultTab="all" onChange={setActiveTab} tabs={tabs} />
  );
}

export function PortfolioTabPanels({
  work,
}: {
  work: ReactNode;
}) {
  return work;
}
