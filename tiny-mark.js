import parseImplementation from './src';
import factory from './dist/tiny-mark.wasm';

export function parse(src) {
  return parseImplementation(src, {
    factory: factory,
    TextEncoder: TextEncoder,
    TextDecoder: TextDecoder
  });
}

