"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AnimatedTabs } from "@/components/ui/animated-tabs";

interface Tab {
  id: string;
  label: string;
}

interface PortfolioTabsContextValue {
  activeTab: string;
  selectTab: (tabId: string, shouldAnimate: boolean) => void;
  shouldAnimatePanel: boolean;
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
  const [activeTab, setActiveTab] = useState("favourites");
  const [shouldAnimatePanel, setShouldAnimatePanel] = useState(false);
  const selectTab = (tabId: string, shouldAnimate: boolean) => {
    setShouldAnimatePanel(shouldAnimate);
    setActiveTab(tabId);
  };
  const value = useMemo(
    () => ({ activeTab, selectTab, shouldAnimatePanel }),
    [activeTab, shouldAnimatePanel],
  );

  return (
    <PortfolioTabsContext.Provider value={value}>
      {children}
    </PortfolioTabsContext.Provider>
  );
}

export function PortfolioTabList({ tabs }: { tabs: Tab[] }) {
  const { selectTab } = usePortfolioTabs();

  return (
    <AnimatedTabs
      defaultTab="favourites"
      onChange={selectTab}
      tabs={tabs}
    />
  );
}

export function PortfolioTabPanels({
  panels,
}: {
  panels: Record<string, ReactNode>;
}) {
  const { activeTab, shouldAnimatePanel } = usePortfolioTabs();
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = shouldAnimatePanel && !prefersReducedMotion;

  return (
    <motion.div
      animate={{ opacity: 1, transform: "translateY(0)" }}
      initial={
        shouldAnimate
          ? { opacity: 0, transform: "translateY(6px)" }
          : false
      }
      key={activeTab}
      style={{ width: "100%" }}
      transition={
        shouldAnimate
          ? { duration: 0.18, ease: [0.23, 1, 0.32, 1] }
          : { duration: 0 }
      }
    >
      {panels[activeTab] ?? null}
    </motion.div>
  );
}
