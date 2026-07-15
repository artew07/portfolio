import type { Metadata } from "next";
import { SoundProvider } from "../sound-provider";
import { SteamifyCaseContent } from "../steamify-case-content";

export const metadata: Metadata = {
  title: "Steamify — Skins Cashout | Artem Suslov",
  description:
    "How I increased web-to-Telegram button CTR from 20% to 50% for Steamify.",
};

export default function SteamifySkinsCashoutPage() {
  return (
    <SoundProvider>
      <SteamifyCaseContent />
    </SoundProvider>
  );
}
