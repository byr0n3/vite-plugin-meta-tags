# Vite Plugin Meta Tags
A Vite plug-in to automatically inject meta tags into your index.html

## What this plugin does
All this plugin does is allow you to import a plugin that can 
automatically inject a bunch of different meta tags into the `head` element 
of your `index.html`.
This makes your page easier to crawl for bots and helps with a better SEO score.

## Usage
Update your `vite.config.js` or `vite.config.ts` and add the following plugin like this:
```typescript
import { defineConfig } from 'vite';
import { meta } from 'vite-plugin-meta-tags';

export default defineConfig({
    plugins: [
		meta({
			// `title`, `og:title`, `twitter:title`
			title: '', // any string
            // `meta:description`, `og:description`, `twitter:description`
			description: '', // any string
            // `og:url`, `twitter:url`, `twitter:domain`
			url: '', // example value: 'https://google.com'
            // `og:image`, `twitter:image` (also adds `twitter:card`)
			img: '', // path to image relative to your index.html, or a image on a CDN
            // `meta:theme-color`, `meta:msapplication-TileColor`
			color: '', // a hex color
		}),
    ]
})
```

It's also possible to use values from your `.env` file.
```typescript
import process from 'process';
import { defineConfig, loadEnv } from 'vite';
import { meta } from 'vite-plugin-meta-tags';

export default defineConfig(function ({ mode }) {
	const env = loadEnv(mode, process.cwd());
	return {
		plugins: [
			meta({
				title: env.TITLE,
				description: env.DESCRIPTION,
				url: env.URL,
				img: env.IMG,
				color: env.COLOR,
			}),
		]
    }
})
```

## Planned features
- [ ] Custom tags
