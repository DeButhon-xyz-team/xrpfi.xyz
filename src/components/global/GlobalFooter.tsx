'use client';

import React from 'react';
import Link from 'next/link';
import { Github, Twitter } from 'lucide-react';
import IconButton from '../ui/IconButton';

export default function GlobalFooter() {
	return (
		<footer className="border-t border-dark-border py-6 mt-auto">
			<div className="max-w-[768px] mx-auto px-4">
				<div className="flex flex-col md:flex-row justify-between items-center">
					<div className="mb-4 md:mb-0">
						<Link
							href="/"
							className="text-xl font-bold text-neon-blue hover:text-neon-purple transition-colors duration-150"
						>
							XRPFI
						</Link>
						<p className="text-sm text-gray-400 mt-2">XRPL 사용자를 위한 멀티체인 스테이킹 플랫폼</p>
					</div>

					<div className="flex flex-col items-center md:items-end">
						<div className="flex space-x-3 mb-3">
							<Link className="flex items-center gap-2" href="https://github.com/xrpfi" target="_blank">
								<IconButton icon={Github} variant="outline" size="sm" />
								<span className="text-sm text-gray-400">https://github.com/DeButhon-xyz-team</span>
							</Link>
						</div>
						<p className="text-sm text-gray-400">© 2024 XRPFI. All rights reserved.</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
