import { createI18n } from 'vue-i18n'
import en from './en.json'
import zhCN from './zh-CN.json'
import koKR from './ko-KR.json'
import trTR from './tr-TR.json'
import elementEnLocale from 'element-plus-secondary/es/locale/lang/en'
import elementZhLocale from 'element-plus-secondary/es/locale/lang/zh-cn'
import { useCache } from '@/utils/useCache'

const elementKoLocale = elementEnLocale
const elementTrLocale = elementEnLocale  // Using English locale for Element Plus as Turkish is not available
const { wsCache } = useCache()

const getDefaultLocale = () => {
  return wsCache.get('user.language') || 'tr-TR'
}

const messages = {
  en: {
    ...en,
    el: elementEnLocale,
  },
  'zh-CN': {
    ...zhCN,
    el: elementZhLocale,
  },
  'ko-KR': {
    ...koKR,
    el: elementKoLocale,
  },
  'tr-TR': {
    ...trTR,
    el: elementTrLocale,
  },
}

export const i18n = createI18n({
  legacy: false,
  locale: getDefaultLocale(),
  fallbackLocale: 'en',
  globalInjection: true,
  messages,
})

const elementLocales = {
  en: elementEnLocale,
  'zh-CN': elementZhLocale,
  'ko-KR': elementKoLocale,
  'tr-TR': elementTrLocale,
} as const

export const getElementLocale = () => {
  const locale = i18n.global.locale.value as keyof typeof elementLocales
  return elementLocales[locale] ?? elementEnLocale
}

