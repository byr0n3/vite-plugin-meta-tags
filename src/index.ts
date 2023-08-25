import type { HtmlTagDescriptor, Plugin } from 'vite';
import type { InjectTo, MetaConfig } from './interface';
import { tagsGenerator } from './generator.js';

export function meta(meta: MetaConfig, injectTo: InjectTo = 'head-prepend', custom?: (() => HtmlTagDescriptor[]) | HtmlTagDescriptor[] | undefined): Plugin {
	return {
		name: 'vite:meta-tags',
		transformIndexHtml: {
			enforce: 'post',
			transform: function () {
				const tags = Array.from(tagsGenerator(meta, injectTo));

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

export type { MetaConfig, InjectTo };
