// Rollup plugins
import { uglify } from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';
import commonjs from 'rollup-plugin-commonjs';
import wasm from 'rollup-plugin-wasm';

export default {
  input: 'tiny-mark.js',
  output: {
    file: 'dist/tiny-mark.min.js',
    format: 'umd',
    name: 'tiny-mark',
  },
  plugins: [
    wasm(),
    commonjs(),
    uglify({}, minify),
  ],
};
