import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './localization/en';

export function setUpLocalization() {
  i18n.use(initReactI18next).init({
    resources: {
      en: {
        translations: en,
      },
    },
    fallbackLng: 'en',
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: false, // we use content as keys
    interpolation: {
      escapeValue: false,
    },
  });
}

const _T: Record<string, any> = en;
const keys = Object.keys(_T);

export function t(key: string) {
  const realKey = keys.find(k => _T[k] === key) || '';
  return i18n.t(realKey);
}

export const T = en;
