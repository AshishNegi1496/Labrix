import type { AppEnvironment } from "@/data/types";

type AppConfig = Readonly<{
  env: AppEnvironment;
  siteUrl: string;
  enableCursorEffects: boolean;
  enableAnimations: boolean;
}>;

const DEFAULT_ENV: AppEnvironment = "development";

function resolveEnv(value: string | undefined): AppEnvironment {
  if (value === "development" || value === "staging" || value === "production") {
    return value;
  }
  return DEFAULT_ENV;
}

function resolveBoolean(value: string | undefined, fallback: boolean) {
  if (value === undefined) return fallback;
  return value === "true";
}

class AppConfigManager {
  private static instance: AppConfigManager | null = null;
  private readonly config: AppConfig;

  private constructor() {
    const env = resolveEnv(process.env.NEXT_PUBLIC_APP_ENV);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://labrix.test";
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
