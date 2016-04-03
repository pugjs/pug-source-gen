# pug-source-gen

Generate Pug sources from a Pug AST. The resultant source may be different from the original Pug source, but the rendered output should be the same.

[![Build Status](https://img.shields.io/travis/pugjs/pug-source-gen/master.svg)](https://travis-ci.org/pugjs/pug-source-gen)
[![Dependency Status](https://img.shields.io/gemnasium/pugjs/pug-source-gen.svg)](https://gemnasium.com/pugjs/pug-source-gen)
[![NPM version](https://img.shields.io/npm/v/pug-source-gen.svg)](https://www.npmjs.org/package/pug-source-gen)

## Installation

    npm install pug-source-gen

## Usage

```js
var lex = require('pug-lexer');
var parse = require('pug-parser');
var genSource = require('pug-source-gen');

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
