import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [preact()],
	base: "",
	server: {
		proxy: {
			'/nominatim': {
				target: 'https://nominatim.openstreetmap.org',
				changeOrigin: true,
				secure: true,
				headers: {
					'User-Agent': 'wtrly/0.1 (+https://github.com/T0liver/wtrly)',
					'Referer': 'http://localhost:5173',
				},
				rewrite: (path) => path.replace(/^\/nominatim/, ''),
			},
		},
	},
});