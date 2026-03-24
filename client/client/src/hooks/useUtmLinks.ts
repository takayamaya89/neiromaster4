import { useMemo } from 'react';

/**
 * UTM-параметры, которые нужно перехватывать и передавать дальше.
 * Включает стандартные UTM + дополнительные рекламные параметры.
 */
const UTM_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  // Дополнительные рекламные параметры
  'fbclid',
  'gclid',
  'yclid',
  'roistat',
  'roistat_visit',
  '_openstat',
  'from',
  'ref',
];

/**
 * Извлекает UTM-параметры из текущего URL страницы.
 * Возвращает объект с найденными параметрами.
 */
function getUtmParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};

  const searchParams = new URLSearchParams(window.location.search);
  const params: Record<string, string> = {};

  for (const key of UTM_PARAMS) {
    const value = searchParams.get(key);
    if (value) {
      params[key] = value;
    }
  }

  return params;
}

/**
 * Добавляет UTM-параметры к указанному URL.
 * Если URL уже содержит какие-то из этих параметров, они будут перезаписаны.
 */
function appendUtmToUrl(baseUrl: string, utmParams: Record<string, string>): string {
  if (Object.keys(utmParams).length === 0) return baseUrl;

  try {
    const url = new URL(baseUrl);
    for (const [key, value] of Object.entries(utmParams)) {
      url.searchParams.set(key, value);
    }
    return url.toString();
  } catch {
    // Если URL невалидный, возвращаем как есть
    return baseUrl;
  }
}

/**
 * React-хук для работы с UTM-метками.
 * 
 * Использование:
 * ```tsx
 * const { buildUrl } = useUtmLinks();
 * <a href={buildUrl("https://example.com/buy")}>Купить</a>
 * ```
 */
export function useUtmLinks() {
  const utmParams = useMemo(() => getUtmParams(), []);

  const buildUrl = useMemo(() => {
    return (baseUrl: string) => appendUtmToUrl(baseUrl, utmParams);
  }, [utmParams]);

  return { utmParams, buildUrl };
}
