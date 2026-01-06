import type { CSSProperties } from "react";

type PartnerItem = {
	name: string;
	role: string;
	description: string;
	placeholder: string;
};

type PartnersProps = {
	eyebrow: string;
	title: string;
	description: string;
	items: PartnerItem[];
};

export default function Partners({
	eyebrow,
	title,
	description,
	items,
}: PartnersProps) {
	const delayStyle = (index: number) =>
		({ "--delay": `${index * 120}ms` } as CSSProperties);

	return (
		<section className="nnpc-section" id="partners">
			<div className="mx-auto max-w-6xl px-6 py-14">
				<div className="text-center" data-reveal>
					<p className="text-sm uppercase tracking-[0.2em] text-amber-800">
						{eyebrow}
					</p>
					<h2 className="font-display mt-4 text-4xl text-neutral-900">
						{title}
					</h2>
					<p className="mt-4 text-sm text-neutral-600">{description}</p>
				</div>

				<div className="mt-8 grid gap-6 md:grid-cols-3">
					{items.map((partner, index) => (
						<article
							key={partner.name}
							className="nnpc-panel flex h-full flex-col gap-5 rounded-2xl p-6"
							data-reveal
							style={delayStyle(index)}
						>
							<div className="nnpc-partner-image">
								<div className="nnpc-partner-placeholder">
									<span>{partner.placeholder}</span>
								</div>
							</div>
							<div>
								<h3 className="text-xl font-semibold text-neutral-900">
									{partner.name}
								</h3>
								<p className="mt-1 text-sm uppercase tracking-[0.2em] text-amber-800">
									{partner.role}
								</p>
							</div>
							<p className="text-sm text-neutral-600">{partner.description}</p>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
