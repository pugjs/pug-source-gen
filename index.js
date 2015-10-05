'use strict';

var objectAssign = require('object-assign');

var Annotator = require('./lib/annotator');
var CodeGenerator = require('./lib/code-generator');
var cleanupAST = require('./lib/cleanup-ast');

module.exports = generateCode;
module.exports.Annotator = Annotator;
module.exports.CodeGenerator = CodeGenerator;
module.exports.defaultOptions = {
  indentChar: '  ',
  useColon: false, // Use block expansion when possible
  preferredQuote: "'" // Preferred quotation mark used in attributes
};

function generateCode(ast, options) {
  options = objectAssign({}, module.exports.defaultOptions, options);
  var cleanedAST = cleanupAST(ast);
  var annotatedAST = (new Annotator(ast, options)).compile();
  return (new CodeGenerator(annotatedAST, options)).compile();
}
