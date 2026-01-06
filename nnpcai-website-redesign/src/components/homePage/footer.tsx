type FooterProps = {
	logoSrc: string;
	logoWidth: number;
	logoHeight: number;
	logoAlt: string;
	blurb: string;
	legalHtml: string;
};

export default function Footer({
	logoSrc,
	logoWidth,
	logoHeight,
	logoAlt,
	blurb,
	legalHtml,
}: FooterProps) {
	return (
		<footer className="nnpc-footer">
			<div className="mx-auto max-w-5xl px-6 py-10 text-center">
				<a className="inline-flex items-center justify-center" href="#" aria-label="NNPC AI">
					<img
						src={logoSrc}
						width={logoWidth}
						height={logoHeight}
						alt={logoAlt}
						className="h-12 w-auto"
						loading="lazy"
					/>
				</a>
				<p className="mt-4 text-sm text-neutral-600">{blurb}</p>
				<p
					className="mt-4 text-sm uppercase tracking-[0.14em] text-neutral-600"
					dangerouslySetInnerHTML={{ __html: legalHtml }}
				></p>
			</div>
		</footer>
	);
}
