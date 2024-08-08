import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'cjs', // Formato CommonJS para Node.js
    inlineDynamicImports: true, // Inlines all dynamic imports into a single file
  },
  plugins: [nodeResolve(), commonjs(), json()],
}
