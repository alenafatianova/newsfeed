import { LocaleSwitcherValues } from '@features/locale/types'

const LS_LOCALE_KEY = 'newsfeed:locale'
export function applyLocale(locale: LocaleSwitcherValues): void {
  localStorage.setItem(LS_LOCALE_KEY, locale)
}

export function getSavedLocale(): LocaleSwitcherValues | null {
  return localStorage.getItem(LS_LOCALE_KEY) as LocaleSwitcherValues | null
}
