import type { CSSProperties } from "react";

type IndustryItem = {
	title: string;
	problem: string;
	solution: string;
};

type IndustriesProps = {
	eyebrow: string;
	title: string;
	items: IndustryItem[];
};

export default function Industries({ eyebrow, title, items }: IndustriesProps) {
	const delayStyle = (index: number) =>
		({ "--delay": `${index * 100}ms` } as CSSProperties);

	return (
		<section className="nnpc-section nnpc-section-dark" id="industries">
			<div className="nnpc-grid" aria-hidden="true"></div>
			<div className="mx-auto max-w-6xl px-6 py-14">
				<div className="text-center" data-reveal>
					<p className="text-sm uppercase tracking-[0.2em] text-amber-800">
						{eyebrow}
					</p>
					<h2 className="font-display mt-4 text-4xl text-neutral-900">
						{title}
					</h2>
				</div>

				<div className="mt-8 grid gap-6 md:grid-cols-2">
					{items.map((industry, index) => (
						<article
							key={industry.title}
							className="nnpc-industry-card"
							data-reveal
							style={delayStyle(index)}
						>
							<h3 className="text-xl font-semibold text-neutral-900">
								{industry.title}
							</h3>
							<div className="mt-5 space-y-4 text-sm text-neutral-700">
								<div>
									<span className="nnpc-label nnpc-label-problem">The Problem</span>
									<p className="mt-2 text-neutral-600">{industry.problem}</p>
								</div>
								<div>
									<span className="nnpc-label nnpc-label-solution">The Solution</span>
									<p className="mt-2 text-neutral-700">{industry.solution}</p>
								</div>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
