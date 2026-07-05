import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export type CaseCardData = {
  title: string;
  description: string;
  image: string;
  tags: string[];
  cta?: string;
};

export function CaseCard({ project }: { project: CaseCardData }) {
  return (
    <article className="flex flex-col gap-6">
      <div className="relative aspect-[1.835/1] overflow-hidden rounded-md bg-[#f4f4f6]">
        <Image
          alt={`${project.title} interface`}
          className="object-cover"
          fill
          sizes="(max-width: 1024px) 100vw, 900px"
          src={project.image}
        />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="text-[18px] font-medium leading-[22px] tracking-[-0.01em] text-[#1a1a1a]">
            {project.title}
          </h2>
          <div className="flex flex-wrap gap-2 lg:justify-end">
            {project.tags.map((tag) => (
              <Badge
                className="h-7 rounded-md border-[#f4f4f6] px-2 py-1 text-sm font-normal leading-5 text-[#595d69]"
                key={tag}
                variant="outline"
              >
                {tag}
              </Badge>
            ))}
            {project.cta ? (
              <Badge
                className="h-7 gap-0.5 rounded-md border-[#00abf5]/5 bg-[#00abf5]/5 py-1 pl-2 pr-1 text-sm font-normal leading-5 text-[#00abf5]"
                key={project.cta}
                variant="outline"
              >
                {project.cta}
                <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
              </Badge>
            ) : null}
          </div>
        </div>
        <p className="max-w-[520px] text-[15px] leading-[22.5px] tracking-normal text-[#595d69]">
          {project.description}
        </p>
      </div>
    </article>
  );
}
