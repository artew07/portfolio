import { Header } from "@/components/header";
import type { ReactNode } from "react";

type PageShellProps = {
  active?: "work" | "tools" | "about";
  children: ReactNode;
  homeHref?: string;
  workHref?: string;
};

export function PageShell({
  active,
  children,
  homeHref,
  workHref,
}: PageShellProps) {
  return (
    <div className="mx-auto flex w-fit items-start">
      <Header active={active} homeHref={homeHref} workHref={workHref} />
      <div className="w-[600px]">{children}</div>
    </div>
  );
}
