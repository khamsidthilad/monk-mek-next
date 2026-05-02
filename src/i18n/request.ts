import { getRequestConfig } from "next-intl/server";

import {
  DEFAULT_LOCALE,
  messages,
  resolveLocale,
} from "@/messages/catalog";

export default getRequestConfig(async ({ requestLocale }) => {
  const raw = (await requestLocale) ?? DEFAULT_LOCALE;
  const locale = resolveLocale(raw);

  return {
    locale,
    messages: messages[locale] as Record<string, unknown>,
  };
});
