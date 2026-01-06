import { defineCollection, z } from "astro:content";

const heroSchema = z.object({
	section: z.literal("hero"),
	eyebrow: z.string(),
	title: z.string(),
	lead: z.string(),
	ctaPrimary: z.string(),
	ctaSecondary: z.string(),
});

const aboutSchema = z.object({
	section: z.literal("about"),
	eyebrow: z.string(),
	title: z.string(),
	accent: z.string(),
	caption: z.string(),
});

const partnersSchema = z.object({
	section: z.literal("partners"),
	eyebrow: z.string(),
	title: z.string(),
	description: z.string(),
	items: z.array(
		z.object({
			name: z.string(),
			role: z.string(),
			description: z.string(),
			placeholder: z.string(),
		})
	),
});

const industriesSchema = z.object({
	section: z.literal("industries"),
	eyebrow: z.string(),
	title: z.string(),
	items: z.array(
		z.object({
			title: z.string(),
			problem: z.string(),
			solution: z.string(),
		})
	),
});

const consultationSchema = z.object({
	section: z.literal("consultation"),
	eyebrow: z.string(),
	title: z.string(),
});

const footerSchema = z.object({
	section: z.literal("footer"),
	blurb: z.string(),
	legal: z.string(),
});

const home = defineCollection({
	type: "content",
	schema: z.discriminatedUnion("section", [
		heroSchema,
		aboutSchema,
		partnersSchema,
		industriesSchema,
		consultationSchema,
		footerSchema,
	]),
});

export const collections = { home };
