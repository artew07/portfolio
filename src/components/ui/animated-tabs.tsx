"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useInteractionSound } from "@/app/sound-provider";

interface Tab {
  id: string;
  label: string;
}

interface AnimatedTabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string, shouldAnimate: boolean) => void;
}

export function AnimatedTabs({
  tabs,
  defaultTab,
  onChange,
}: AnimatedTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].id);
  const { playTap } = useInteractionSound();

  const handleTabChange = (tabId: string, shouldAnimate: boolean) => {
    if (tabId === activeTab) {
      return;
    }

    playTap();
    setActiveTab(tabId);
    onChange?.(tabId, shouldAnimate);
  };

  return (
    <div className="flex space-x-1">
      {tabs.map((tab) => (
        <button
          className={`
            relative cursor-pointer rounded-full px-3 py-1.5 text-sm font-regular
            text-[#051E1D] transition focus-visible:outline-2
            focus-visible:outline-[#051E1D]
            ${activeTab === tab.id ? "" : "hover:text-[#051E1D]/50"}
          `}
          key={tab.id}
          onClick={(event) => handleTabChange(tab.id, event.detail !== 0)}
          style={{
            WebkitTapHighlightColor: "transparent",
          }}
          type="button"
        >
          {activeTab === tab.id && (
            <motion.span
              className="absolute inset-0 z-10 bg-[#F4F4F6] mix-blend-darken"
              layoutId="bubble"
              style={{ borderRadius: 9999 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
