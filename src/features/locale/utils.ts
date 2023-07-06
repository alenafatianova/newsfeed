import { Locale } from '@features/locale/types'

export const keys: Record<Locale, Record<string, string>> = {
  [Locale.en]: {
    homepage_trends_title: 'Trending now',
  },
  [Locale.ru]: {
    homepage_trends_title: 'В тренде',
  },
  [Locale.de]: {
    homepage_trends_title: 'Trends',
  },
  [Locale.it]: {
    homepage_trends_title: 'Trends',
  },
  [Locale.fr]: {
    homepage_trends_title: 'Trends',
  },
}

const LS_LOCALE_KEY = 'newsfeed:locale'

export const applyLocale = (locale: Locale): void => {
  localStorage.setItem(LS_LOCALE_KEY, locale)
}

export const getSavedLocale = (): Locale => {
  const lsLocale = localStorage.getItem(LS_LOCALE_KEY)

  if (lsLocale) {
    return lsLocale as Locale
  }

  const language = window.navigator.language
  const locale = language.split('-')[0] as Locale

  return Object.values(Locale).includes(locale) ? locale : Locale.en
}

export const initI18n = (callback: () => any): void => {
  const currentLocale = getSavedLocale()

  applyLocale(currentLocale || Locale.en)

  callback()
}

export const getLang = (key: string | any, params?: { count: number }): string => {
  const langKeys = key[getSavedLocale()]

  if (!langKeys) {
    return key
  }

  if (typeof params?.count === 'number') {
    return langKeys[key].replace('{count}', params.count.toString()) || key
  }

  return langKeys[key] || key
}
