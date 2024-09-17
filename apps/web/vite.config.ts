import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@screens': resolve(__dirname, './src/screens'),
			'@modules': resolve(__dirname, './src/modules'),
			'@shared': resolve(__dirname, './src/shared'),
			'@ui': resolve(__dirname, './src/ui'),
		},
	},
});
