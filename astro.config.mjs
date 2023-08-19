import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Ruema Belajar',
			social: {
				github: 'https://github.com/ruemakarya/',
			},
			sidebar: [
				{ label: 'Mulai Belajar', link: '/mulai-belajar' },
				{ label: 'Topik Belajar', link: '/topik-belajar' },
				{
						label: 'Ilmu Komputer',
						collapsed: true,
						autogenerate: { directory: 'komputer' },
				},
				// {
				// 	label: 'Topik',
				// 	items: [
				// 		// Each item here is one entry in the navigation menu.
				// 		{ label: 'Cyber Security', link: '/guides/example/', },
				// 	],
				// },
				// {
				// 	label: 'Topik',
				// 	collapsed: true,
				// 	items: [
				// 		// Each item here is one entry in the navigation menu.
				// 		{ label: 'Cyber Security', link: '/guides/example/', },
				// 	],
				// },
				// {
				// 	label: 'Reference',
				// 	collapsed: true,
				// 	autogenerate: { directory: 'reference' },
				// },

				{ label: 'Kontribusi', link: '/kontribusi' },
			],
		}),
	],

	// Process images with sharp: https://docs.astro.build/en/guides/assets/#using-sharp
	image: { service: { entrypoint: 'astro/assets/services/sharp' } },
});
