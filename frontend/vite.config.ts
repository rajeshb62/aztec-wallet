import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

const aztecVersion = "0.55.0";

export default defineConfig({
    plugins: [
        react(),
        nodePolyfills(),
        {
            name: 'custom-resolve',
            resolveId(source) {
                if (source === '@aztec/bb.js') {
                    return `https://unpkg.com/@aztec/bb.js@${aztecVersion}/dest/browser/index.js`;
                }
            }
        }
    ],
    // ... rest of your config
});