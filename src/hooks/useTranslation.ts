import { useLanguageStore } from '@/store/languageStore';
import { translations } from '@/translations';

type Language = 'en' | 'ko';

export const useTranslation = () => {
	const { language } = useLanguageStore();

	const t = (key: string, variables?: Record<string, string | number>) => {
		const keys = key.split('.');
		let value: any = translations[language as Language];

		for (const k of keys) {
			value = value?.[k];
			if (value === undefined) {
				console.warn(`Translation key not found: ${key}`);
				return key;
			}
		}

		// 변수 치환
		if (variables && typeof value === 'string') {
			return Object.entries(variables).reduce((str, [key, val]) => {
				return str.replace(new RegExp(`{${key}}`, 'g'), String(val));
			}, value);
		}

		return value;
	};

	return { t };
}; 