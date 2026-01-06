type HeroProps = {
	eyebrow: string;
	title: string;
	lead: string;
	bodyHtml: string;
	ctaPrimary: string;
	ctaSecondary: string;
	imageSrc: string;
	imageWidth: number;
	imageHeight: number;
};

export default function Hero({
	eyebrow,
	title,
	lead,
	bodyHtml,
	ctaPrimary,
	ctaSecondary,
	imageSrc,
	imageWidth,
	imageHeight,
}: HeroProps) {
	return (
		<header className="nnpc-hero">
			<img
				className="nnpc-hero-media"
				src={imageSrc}
				width={imageWidth}
				height={imageHeight}
				alt=""
				loading="eager"
				decoding="async"
				aria-hidden="true"
			/>
			<div className="nnpc-hero-overlay" aria-hidden="true"></div>
			<div className="nnpc-hero-inner relative z-10 mx-auto flex w-full max-w-6xl items-center justify-center px-6 py-12">
				<div className="nnpc-hero-main space-y-5 text-center" data-reveal>
					<p className="text-sm uppercase tracking-[0.2em] text-amber-800">
						{eyebrow}
					</p>
					<h1 className="font-display text-5xl leading-tight text-neutral-900 md:text-6xl">
						{title}
					</h1>
					<p className="text-lg font-semibold text-amber-800 md:text-xl">
						{lead}
					</p>
					<div
						className="text-base text-neutral-700 md:text-lg"
						dangerouslySetInnerHTML={{ __html: bodyHtml }}
					/>
					<div className="flex flex-wrap justify-center gap-4">
						<a className="nnpc-btn nnpc-btn-primary" href="#consultation">
							{ctaPrimary}
						</a>
						<a className="nnpc-btn nnpc-btn-outline" href="#industries">
							{ctaSecondary}
						</a>
					</div>
				</div>
			</div>
		</header>
	);
}
