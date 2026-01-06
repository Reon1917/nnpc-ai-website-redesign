import type { CSSProperties } from "react";

type AboutProps = {
	eyebrow: string;
	title: string;
	accent: string;
	caption: string;
	bodyHtml: string;
};

export default function About({
	eyebrow,
	title,
	accent,
	caption,
	bodyHtml,
}: AboutProps) {
	const delayStyle = { "--delay": "140ms" } as CSSProperties;

	return (
		<section className="nnpc-section nnpc-section-light" id="about">
			<div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 lg:grid-cols-[1.05fr_0.95fr]">
				<div className="space-y-4" data-reveal>
					<p className="text-sm uppercase tracking-[0.2em] text-neutral-600">
						{eyebrow}
					</p>
					<h2 className="font-display text-4xl text-neutral-900">{title}</h2>
					<div
						className="space-y-4 text-base text-neutral-600"
						dangerouslySetInnerHTML={{ __html: bodyHtml }}
					/>
					<div className="flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-amber-800">
						<span className="nnpc-dot nnpc-dot-dark"></span>
						{accent}
					</div>
				</div>
				<div className="relative" data-reveal style={delayStyle}>
					<div className="nnpc-image-frame">
						<div className="nnpc-image-placeholder">
							<span>Image Placeholder</span>
						</div>
					</div>
					<div className="nnpc-caption">{caption}</div>
				</div>
			</div>
		</section>
	);
}
