// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import resolve from "vite-plugin-resolve";
import react from '@vitejs/plugin-react'  // Add this line

const aztecVersion = "0.51.0";

export default defineConfig({
    plugins: [
        react(),  // Add this line
        process.env.NODE_ENV === "production"
            ? resolve({
                  "@aztec/bb.js": `export * from "https://unpkg.com/@aztec/bb.js@${aztecVersion}/dest/browser/index.js"`,
              })
            : undefined,
        nodePolyfills(),
    ],
    build: {
        target: "esnext",
    },
    optimizeDeps: {
        esbuildOptions: {
            target: "esnext",
        },
    },
});