import type { MetaConfig, TagType, InjectTo } from './interface';
import type { HtmlTagDescriptor } from 'vite';

function title(value: string) {
	return {
		tag: 'title',
		children: value,
	};
}

function twitterDomain(value: string) {
	return {
		tag: 'meta',
		attrs: {
			property: 'twitter:domain',
			content: new URL(value).hostname,
		},
	};
}

function twitterCardImg() {
	return {
		tag: 'meta',
		attrs: {
			name: 'twitter:card',
			content: 'summary_large_image',
		},
	};
}

const GENERATORS: Record<TagType, (object | ((value: string) => HtmlTagDescriptor))[]> = {
	title: [title, { property: 'og:title' }, { name: 'twitter:title' }],
	description: [{ name: 'description' }, { property: 'og:description' }, { name: 'twitter:description' }],
	url: [{ property: 'og:url' }, { property: 'twitter:url' }, twitterDomain],
	img: [{ property: 'og:image' }, twitterCardImg, { name: 'twitter:image' }],
	color: [{ name: 'theme-color' }, { name: 'msapplication-TileColor' }],
	google: [{ name: 'google-site-verification' }],
};

export function* tagsGenerator(meta: MetaConfig, injectTo: InjectTo): Generator<HtmlTagDescriptor, void> {
	for (const [key, $value] of Object.entries(meta)) {
		if ($value == null) {
			continue;
		}

		const value = $value.toString();

		const type = key as TagType;

		const generators = GENERATORS[type];

		for (const generator of generators) {
			if (typeof generator === 'function') {
				yield {
					...generator(value),
					injectTo,
				};
			} else {
				yield {
					tag: 'meta',
					attrs: {
						...generator,
						content: value,
					},
					injectTo,
				};
			}
		}
	}
}
