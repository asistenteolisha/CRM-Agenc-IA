import { getStoredUtmParams } from './utm'

type AnalyticsParams = Record<string, string | number | boolean | null | undefined>

declare global {
  interface Window {
    dataLayer?: unknown[]
    fbq?: (...args: unknown[]) => void
    gtag?: (...args: unknown[]) => void
  }
}

function cleanParams(params: AnalyticsParams = {}): Record<string, string | number | boolean> {
  const cleaned: Record<string, string | number | boolean> = {}

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === '') continue
    cleaned[key] = value
  }

  return cleaned
}

export function trackEvent(name: string, params: AnalyticsParams = {}) {
  if (typeof window === 'undefined') return

  const eventParams = cleanParams({
    ...getStoredUtmParams(),
    page_path: window.location.pathname + window.location.hash,
    page_location: window.location.href,
    ...params
  })

  window.gtag?.('event', name, eventParams)
  window.fbq?.('trackCustom', name, eventParams)
}
