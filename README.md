# jade-source-gen

Generate Jade sources from a Jade AST. The resultant source may be different from the original Jade source, but the rendered output should be the same.

[![Build Status](https://img.shields.io/travis/jadejs/jade-source-gen/master.svg)](https://travis-ci.org/jadejs/jade-source-gen)
[![Dependency Status](https://img.shields.io/gemnasium/jadejs/jade-source-gen.svg)](https://gemnasium.com/jadejs/jade-source-gen)
[![NPM version](https://img.shields.io/npm/v/jade-source-gen.svg)](https://www.npmjs.org/package/jade-source-gen)

## Installation

    npm install jade-source-gen

## Usage

```js
var lex = require('jade-lexer');
var parse = require('jade-parser');
var genSource = require('jade-source-gen');

var source = `
include a

mixin myMixin(arg)
  block
  p&attributes(attributes) Paragraph: #[strong= arg]

html
  head
  body
    p.klass(attr falseattr=false class=['myClass']) Introduction
    +myMixin('Content').klass2
      h1 Heading
`;
var ast = parse(lex(source));

var generatedSource = genSource(ast);
// =>
// include a
// mixin myMixin(arg)
//   block
//   p&attributes(attributes) Paragraph: #[strong= arg]
// html
//   head
//   body
//     p.klass(attr falseattr=false class=['myClass']) Introduction
//     +myMixin('Content').klass2
//       h1 Heading
```

## License

MIT
