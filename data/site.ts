import { appConfig } from "@/config/app-config";
import { deepFreeze } from "./utils";
import type { SiteMeta } from "./types";

/** Core site metadata used in layout and SEO. */
export const siteMeta: SiteMeta = deepFreeze({
  name: "Labrix",
  description: "Trusted scientific solutions for a smarter, safer world.",
  url: appConfig.siteUrl,
});
