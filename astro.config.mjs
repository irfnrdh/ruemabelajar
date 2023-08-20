import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [starlight({
    title: 'Ruema Belajar',
    social: {
      github: 'https://github.com/ruemakarya/'
    },
	customCss: [
		// Path to your Tailwind base styles:
		'./src/tailwind.css',
	],
    sidebar: [

		{
			label: 'Mulai Belajar',
		
			autogenerate: {
			  directory: 'belajar'
			},
		},

    // collapsed: true,
	// {
    //   label: 'Mulai Belajar',
    //   link: '/mulai-belajar'
    // },	
	// {
    //   label: 'Topik Belajar',
    //   link: '/topik-belajar'
    // },
	
	// {
  //     label: 'Laravel',
  //     collapsed: true,
  //     autogenerate: {
  //       directory: 'laravel'
  //     }
  //   },

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

    // {
    //   label: 'Kontribusi',
    //   link: '/kontribusi'
    // }
  
  ]
  }), tailwind({
	// Disable the default base styles:
	applyBaseStyles: false,
})],
  // Process images with sharp: https://docs.astro.build/en/guides/assets/#using-sharp
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  }
});