"use client";

import type { ReactNode } from "react";
import { useInteractionSound } from "./sound-provider";
import styles from "./inline-link.module.css";

interface InlineLinkProps {
  children: ReactNode;
  href: string;
}

export function InlineLink({ children, href }: InlineLinkProps) {
  const { playTap } = useInteractionSound();

  return (
    <a
      className={styles.link}
      href={href}
      onClick={playTap}
      rel="noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
}
