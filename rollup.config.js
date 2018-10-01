// Rollup plugins
import { uglify } from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';
import commonjs from 'rollup-plugin-commonjs';
import string from 'rollup-plugin-string';
import { compile } from 'walt-compiler';
const bootstrap = `const {
  Module,
  instantiate,
  Memory,
  Table
} = WebAssembly;

const WebAssemblyModule = function(deps) {
  return instantiate(buffer, deps);
}

export default WebAssemblyModule;
`;

function walt(_options = {}) {
  return {
    transform(code, file) {
      if (file.slice(-5) !== '.walt') {
        return null;
      }

      const buffer = compile(code).buffer();
      const view = new Uint8Array(buffer);
      var code = "var buffer = new ArrayBuffer(" + buffer.byteLength + ");";
			code += "var uint8 = new Uint8Array(buffer);";
			code += "uint8.set([";
			for(var i = 0; i < view.length; i++) {
				code += view[i] + ","
			}
			code += "]);"
			code += bootstrap;

      return {
        code,
        map: { mappings: '' },
      };
    },
  };
};
export default {
  input: 'tiny-mark.js',
  output: {
    file: 'dist/tiny-mark.min.js',
    format: 'umd',
    name: 'tinyMark',
  },
  plugins: [
		walt(),
    commonjs(),
    //uglify({}, minify),
  ],
};
