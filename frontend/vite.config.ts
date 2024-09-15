import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import resolve from 'vite-plugin-resolve';
import path from 'path';

const aztecVersion = "0.55.0";

// Helper function to resolve paths relative to the project root
const rootResolve = (...segments: string[]) => path.resolve(__dirname, '..', ...segments);

export default defineConfig({
    root: __dirname,
    resolve: {
        alias: {
            'fs/promises': rootResolve('node_modules/node-stdlib-browser/mock/empty'),
            'fs': rootResolve('node_modules/node-stdlib-browser/mock/empty'),
            'path': rootResolve('node_modules/node-stdlib-browser/mock/empty'),
        },
    },
    plugins: [
        process.env.NODE_ENV === "production"
            ? /** @type {any} */ (
                resolve({
                    "@aztec/bb.js": `export * from "https://unpkg.com/@aztec/bb.js@${aztecVersion}/dest/browser/index.js"`,
                })
            )
            : undefined,
        nodePolyfills({
            include: ['buffer', 'crypto', 'stream', 'util'],
        }),
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