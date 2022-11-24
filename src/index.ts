import type { Plugin } from 'vite';
import type { MetaConfig } from './interface';
import { tagsGenerator } from './generator.js';

export type { MetaConfig };
export function meta(meta: MetaConfig): Plugin {
	return {
		name: 'vite:meta-tags',
		transformIndexHtml: {
			enforce: 'post',
			transform: function () {
				return Array.from(tagsGenerator(meta));
			},
		},
	};
}
