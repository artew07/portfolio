import type { Metadata } from "next";
import { AnimatorCaseRussianContent } from "../../animator-case-content";
import { SoundProvider } from "../../sound-provider";

export const metadata: Metadata = {
  title: "Animator | Артём Суслов",
  description: "Как я спроектировал и собрал Animator — браузерный инструмент для MP4-каруселей.",
};

export default function AnimatorRussianPage() {
  return <SoundProvider><AnimatorCaseRussianContent /></SoundProvider>;
}
