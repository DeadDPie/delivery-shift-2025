import defaultMessages from '../../../../static/locales/ru.json' assert { type: 'json' }

export type Messages = Record<LocaleMessageId, string>

export const getMessagesByLocale = (locale: string): Messages => {
  try {

    const localeMessages = require(`/static/locales/${locale}.json`) as Messages

    return localeMessages
  } catch (error: unknown) {
    console.error('Error loading messages for locale', locale, error)

    return defaultMessages
  }
}
