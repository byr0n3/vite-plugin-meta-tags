import type { HtmlTagDescriptor, Plugin } from 'vite';
import type { MetaConfig } from './interface';
import { tagsGenerator } from './generator.js';

export type { MetaConfig };

export function meta(meta: MetaConfig, custom?: (() => HtmlTagDescriptor[]) | HtmlTagDescriptor[] | undefined): Plugin {
	return {
		name: 'vite:meta-tags',
		transformIndexHtml: {
			enforce: 'post',
			transform: function () {
				const tags = Array.from(tagsGenerator(meta));

				if (!custom) {
					return tags;
				}

				if (typeof custom === 'function') {
					return [...custom(), ...tags];
				}

				return [...custom, ...tags];
			},
		},
	};
}
