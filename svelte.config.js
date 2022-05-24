import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		alias: {
			$components: 'src/components',
			$stores: 'src/stores'
		},
		adapter: adapter({ out: 'build' })
	},
};

export default config;
