import { defineConfig } from 'tsdown';

export default defineConfig({
    entry: ['./lib/server.ts'],
    // Wait for https://github.com/vercel/vercel/pull/14429
    // Then we can set outDir to outputDirectory in vercel.json
    outDir: 'src',
    minify: true,
    shims: true,
    clean: true,
    // copy: [{ from: 'lib/assets', to: 'dist' }],
    deps: {
        onlyBundle: false,
        // sanitize-html is CommonJS and calls require('htmlparser2'), while
        // htmlparser2 12 is ESM-only. Vercel's Node.js runtime rejects that
        // require() unless require(esm) is enabled, so inline both packages
        // instead of leaving them to be loaded from node_modules at runtime.
        alwaysBundle: ['sanitize-html'],
    },
});
