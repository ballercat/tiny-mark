
function parse(markdown, options) {
  var factory = options.factory;
  var TextEncoder = options.TextEncoder;
  var TextDecoder = options.TexDecoder;
  var memory = new WebAssembly.Memory({ initial: 1 });
  var view = new Uint8Array(memory.buffer);

  return factory({ env: { memory: memory, log: console.log }}).then(function(mod) {
    var instance = mod.instance;
    var uint8Array = new TextEncoder().encode(markdown);
    var offset = instance.exports.getOffsetStart();
    view.set(uint8Array, offset);

    var parserPtr = instance.exports.parse(offset, uint8Array.length);
    var start = instance.exports.getStart(parserPtr);
    var length = instance.exports.getLength(parserPtr);

    var decoder = new TextDecoder();

    return decoder.decode(memory.buffer.slice(start, start + length));
  });
}

module.exports = parse;

