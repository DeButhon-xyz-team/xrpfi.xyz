'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Github } from 'lucide-react';
import IconButton from '../ui/IconButton';
import { useTranslation } from '@/hooks/useTranslation';

export default function GlobalFooter() {
	const { t } = useTranslation();

	return (
		<footer className="border-t border-dark-border py-6 mt-auto">
			<div className="max-w-[768px] mx-auto px-4">
				<div className="flex flex-col md:flex-row justify-between items-center">
					<div className="mb-4 md:mb-0">
						<Link href="/" className="cursor-pointer flex justify-center w-fit mx-auto md:mx-0">
							<Image
								src="/images/logo_concierge.png"
								alt={t('common.footer.logoAlt')}
								width={100}
								height={33}
								className="hover:opacity-90 transition-opacity duration-150"
							/>
						</Link>
						<p className="text-sm text-gray-400 mt-2">{t('common.footer.description')}</p>
					</div>

					<div className="flex flex-col items-center md:items-end">
						<div className="flex space-x-3 mb-3">
							<Link className="flex items-center gap-2" href="https://github.com/xrpfi" target="_blank">
								<IconButton icon={Github} variant="outline" size="sm" />
								<span className="text-xs text-gray-400">https://github.com/DeButhon-xyz-team</span>
							</Link>
						</div>
						<p className="text-sm text-gray-400">{t('common.footer.copyright')}</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
