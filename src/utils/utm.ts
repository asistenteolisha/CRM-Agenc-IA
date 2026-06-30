const STORAGE_KEY = 'agenc_ia_utm'
const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content'
] as const

type UTMKey = (typeof UTM_KEYS)[number]
export type UTMParams = Partial<Record<UTMKey, string>>

function cleanUtmValue(value: unknown): string {
  return String(value || '').trim().slice(0, 250)
}

function pickUtmParams(params: URLSearchParams): UTMParams {
  const picked: UTMParams = {}

  for (const key of UTM_KEYS) {
    const value = cleanUtmValue(params.get(key))
    if (value) picked[key] = value
  }

  return picked
}

function sanitizeStoredUtm(input: unknown): UTMParams {
  if (!input || typeof input !== 'object') return {}

  const sanitized: UTMParams = {}

  for (const key of UTM_KEYS) {
    const value = cleanUtmValue((input as Record<string, unknown>)[key])
    if (value) sanitized[key] = value
  }

  return sanitized
}

function getHashQueryParams(): URLSearchParams {
  if (typeof window === 'undefined') return new URLSearchParams()

  const queryIndex = window.location.hash.indexOf('?')
  if (queryIndex === -1) return new URLSearchParams()

  return new URLSearchParams(window.location.hash.slice(queryIndex + 1))
}

export function getStoredUtmParams(): UTMParams {
  if (typeof window === 'undefined') return {}

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    return sanitizeStoredUtm(JSON.parse(raw))
  } catch {
    return {}
  }
}

export function captureUtmParams(): UTMParams {
  if (typeof window === 'undefined') return {}

  const current = {
    ...pickUtmParams(new URLSearchParams(window.location.search)),
    ...pickUtmParams(getHashQueryParams())
  }
  const stored = getStoredUtmParams()
  const merged = { ...stored, ...current }

  try {
    if (Object.keys(merged).length > 0) {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
    }
  } catch {
    // ponytail: sessionStorage can fail in private contexts; skip persistence there.
  }

  return merged
}

export function withStoredUtmParams<T extends Record<string, unknown>>(payload: T): T & UTMParams {
  return {
    ...payload,
    ...captureUtmParams()
  }
}
