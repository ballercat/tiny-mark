
function parse(markdown, { factory, TextEncoder, TextDecoder }) {
  const memory = new WebAssembly.Memory({ initial: 1 });
  const view = new Uint8Array(memory.buffer);

  return factory({ env: { memory }}).then(({ instance }) => {
    const uint8Array = new TextEncoder().encode(markdown);
    view.set(uint8Array, 1);

    const res = instance.exports.parse(1, uint8Array.length);

    const start = instance.exports.getStart();
    const length = instance.exports.getLength();

    const decoder = new TextDecoder();

    return decoder.decode(memory.buffer.slice(start, start + length));
  });
}

module.exports = parse;

