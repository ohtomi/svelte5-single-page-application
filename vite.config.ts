import { sveltekit } from "@sveltejs/kit/vite";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [sveltekit()],

	css: {
		postcss: {
			plugins: [tailwindcss, autoprefixer],
		},
	},

	test: {
		include: ["src/**/*.{test,spec}.{ts}"],
	},
});
