import { useLanguageStore } from '@/store/languageStore';
import { Globe, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

type Language = 'en' | 'ko';

export function LanguageSelector() {
	const { language, setLanguage } = useLanguageStore();
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// 드롭다운 외부 클릭 시 닫기
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className="relative" ref={dropdownRef}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="flex items-center space-x-0 sm:space-x-2 px-2 sm:px-3 py-1 bg-dark-card border border-dark-border rounded-md hover:border-neon-purple transition-colors duration-150"
			>
				<Globe className="w-4 h-4 text-gray-400" />
				<span className="text-sm hidden sm:inline">{language === 'en' ? 'English' : '한국어'}</span>
				<ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 hidden sm:block ${isOpen ? 'rotate-180' : ''}`} />
			</button>
			
			{isOpen && (
				<div className="absolute right-0 mt-2 w-32 bg-dark-card border border-dark-border rounded-md shadow-lg z-50">
					<button
						onClick={() => {
							setLanguage('en');
							setIsOpen(false);
						}}
						className={`w-full px-4 py-2 text-sm text-left hover:bg-dark-border transition-colors duration-150 ${
							language === 'en' ? 'text-neon-purple' : 'text-gray-400'
						}`}
					>
						English
					</button>
					<button
						onClick={() => {
							setLanguage('ko');
							setIsOpen(false);
						}}
						className={`w-full px-4 py-2 text-sm text-left hover:bg-dark-border transition-colors duration-150 ${
							language === 'ko' ? 'text-neon-purple' : 'text-gray-400'
						}`}
					>
						한국어
					</button>
				</div>
			)}
		</div>
	);
} 