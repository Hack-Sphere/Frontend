import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import {visualizer} from 'rollup-plugin-visualizer';
// https://vite.dev/config/
export default defineConfig({
    base: '/Frontend/', // e.g., '/Hacksphere/'
    plugins: [
        visualizer({ open: true }),
        tailwindcss(),
        react()
    ],
    server: {
        host: true
    }
})
