import type { AppEnvironment } from "@/data/types";

type AppConfig = Readonly<{
  env: AppEnvironment;
  siteUrl: string;
  enableCursorEffects: boolean;
  enableAnimations: boolean;
}>;

function resolveEnv(value: string | undefined): AppEnvironment {
  if (!value) {
    return process.env.NODE_ENV === "production" ? "production" : "development";
  }

  if (
    value === "development" ||
    value === "staging" ||
    value === "production"
  ) {
    return value;
  }

  throw new Error(
    "NEXT_PUBLIC_APP_ENV must be one of: development, staging, production.",
  );
}

function resolveBoolean(value: string | undefined, fallback: boolean) {
  if (value === undefined) return fallback;
  if (value !== "true" && value !== "false") {
    throw new Error("Feature flags must be provided as 'true' or 'false'.");
  }
  return value === "true";
}

function resolveSiteUrl(value: string | undefined) {
  const normalized = value?.trim();
if (!normalized) {
    // If we are on Vercel, use their automatically provided URL as a fallback
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`;
    }

    if (process.env.NODE_ENV === "production") {
      // Switch this to a warning instead of a throw during build if you want to be safe
      console.warn("⚠️ NEXT_PUBLIC_SITE_URL is missing. Falling back to Vercel System URL.");
      return process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";
    }

    return "http://localhost:3000";
  }
  try {
    return new URL(normalized).toString().replace(/\/$/, "");
  } catch {
    throw new Error("NEXT_PUBLIC_SITE_URL must be a valid absolute URL.");
  }
}

class AppConfigManager {
  private static instance: AppConfigManager | null = null;
  private readonly config: AppConfig;

  private constructor() {
    const env = resolveEnv(process.env.NEXT_PUBLIC_APP_ENV);
    const siteUrl = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
    const enableCursorEffects = resolveBoolean(
      process.env.NEXT_PUBLIC_ENABLE_CURSOR,
      true,
    );
    const enableAnimations = resolveBoolean(
      process.env.NEXT_PUBLIC_ENABLE_ANIMATIONS,
      true,
    );

    this.config = Object.freeze({
      env,
      siteUrl,
      enableCursorEffects,
      enableAnimations,
    });
  }

  static getInstance() {
    if (!AppConfigManager.instance) {
      AppConfigManager.instance = new AppConfigManager();
    }
    return AppConfigManager.instance;
  }

  getConfig() {
    return this.config;
  }
}

/** Singleton access to application configuration. */
export const appConfig = AppConfigManager.getInstance().getConfig();
