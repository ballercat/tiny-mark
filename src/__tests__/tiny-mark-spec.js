import path from "path";
import fs from "fs";
import test from 'ava';
import parse from '..';
import link from 'walt-link';
import { TextDecoder, TextEncoder } from 'util';

const compiler = require('walt-compiler');

const decodeText = (view, ptr) => {
  const decoder = compiler.stringDecoder(view, ptr);
  let iterator = decoder.next();
  let text = "";
  while (!iterator.done) {
    text += String.fromCodePoint(iterator.value);
    iterator = decoder.next();
  }

  return text;
};

const resolve = (file, parent) => {
  if (parent != null) {
    return path.resolve(
      path.dirname(parent),
      file.slice(-5) === ".walt" ? file : file + ".walt"
    );
  }

  return path.resolve(__dirname, file);
};

const getFileContents = (file, parent, mode) => {
  if (parent != null) {
    return fs.readFileSync(resolve(file, parent), mode);
  }

  return fs.readFileSync(resolve(file, null), mode);
};

test('parser tests', t => {
  debugger;
  const src = `# Header


Lorem ipsum.

* Item1
* Item2
`;

  const factory = link("../walt/index.walt", null, {
    ...compiler,
    getFileContents,
    resolve,
  });
  return parse(src, { factory, TextDecoder, TextEncoder }).then(result => {
    t.is(typeof result, 'string');
    console.log(result);
    //t.snapshot(result);
  });
});
