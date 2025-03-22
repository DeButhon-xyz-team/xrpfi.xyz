import Link from 'next/link';

export default function GlobalHeader() {
	return (
		<header className="border-b border-dark-border py-4">
			<div className="container mx-auto px-4 flex justify-between items-center">
				<Link
					href="/"
					className="text-2xl font-bold text-neon-blue hover:text-neon-purple transition-colors duration-150"
				>
					XRPFI
				</Link>
				<nav>
					<ul className="flex space-x-4">
						<li>
							<Link href="/" className="hover:text-neon-purple transition-colors duration-150">
								홈
							</Link>
						</li>
						<li>
							<Link href="/stake" className="hover:text-neon-purple transition-colors duration-150">
								스테이킹
							</Link>
						</li>
						<li>
							<Link href="/withdraw" className="hover:text-neon-purple transition-colors duration-150">
								해지
							</Link>
						</li>
					</ul>
				</nav>
				<button className="bg-neon-purple text-black px-4 py-1.5 rounded-md hover:bg-neon-purple/80 transition-colors duration-150">
					지갑 연결
				</button>
			</div>
		</header>
	);
}
