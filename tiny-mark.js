import parseImplementation from './src';
import factory from './src/walt/index.walt';

export function parse(src) {

  return parseImplementation(src, {
    factory,
    TextEncoder: TextEncoder,
    TextDecoder: TextDecoder
  });
}

