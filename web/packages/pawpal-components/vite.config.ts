import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: 'src/index.ts',  // Your library entry file
      name: '@pawpal-web/components',
      fileName: (format) => `@pawpal-web-components.${format}.js`,
      formats: ['es', 'umd'], // Ensure you build in the desired formats
    },
    rollupOptions: {
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
})
