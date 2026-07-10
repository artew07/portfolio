import type { MetadataRoute } from "next";

const siteUrl = "https://artem-portfolio.layero.ru";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
