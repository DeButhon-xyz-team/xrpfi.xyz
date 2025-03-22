import React from 'react';

type PageWrapperProps = {
	children: React.ReactNode;
	className?: string;
	title?: string;
};

export default function PageWrapper({ children, className = '', title }: PageWrapperProps) {
	return (
		<main className={`container mx-auto px-4 py-8 min-h-[calc(100vh-160px)] ${className}`}>
			{title && <h1 className="text-3xl font-bold mb-6">{title}</h1>}
			{children}
		</main>
	);
}
