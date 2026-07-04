"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Tab {
  id: string;
  label: string;
}

interface AnimatedTabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
}

export function AnimatedTabs({
  tabs,
  defaultTab,
  onChange,
}: AnimatedTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].id);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  return (
    <div className="flex space-x-1">
      {tabs.map((tab) => (
        <button
          className={`
            relative rounded-[var(--radius-3xl)] px-3 py-1.5 text-sm font-regular
            text-[#051E1D] outline-ring transition
            focus-visible:outline-2
            ${activeTab === tab.id ? "" : "hover:text-foreground/50"}
          `}
          key={tab.id}
          onClick={() => handleTabChange(tab.id)}
          style={{
            WebkitTapHighlightColor: "transparent",
          }}
          type="button"
        >
          {activeTab === tab.id && (
            <motion.span
              className="absolute inset-0 z-10 bg-[#F1F3F3] mix-blend-darken"
              layoutId="bubble"
              style={{ borderRadius: "var(--radius-3xl)" }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
