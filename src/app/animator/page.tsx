import type { Metadata } from "next";
import { AnimatorCaseContent } from "../animator-case-english-content";
import { SoundProvider } from "../sound-provider";

export const metadata: Metadata = {
  title: "Animator | Artem Suslov",
  description: "How I designed and built Animator, a browser tool for MP4 carousel showcases.",
};

export default function AnimatorPage() {
  return <SoundProvider><AnimatorCaseContent /></SoundProvider>;
}
