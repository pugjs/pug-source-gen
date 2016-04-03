'use strict';

var walk = require('pug-walk');

module.exports = cleanUpAST;

// Removes extraneous Block hierarchy:
// Block1 {
//   nodes: [
//     Block2 {
//       nodes: [
//         Tag1 {}
//       ]
//     },
//     Tag2 {}
//   ]
// }
//
// to
//
// Block {
//   nodes: [
//     Tag1 {}
//     Tag2 {}
//   ]
// }
function cleanUpAST(ast) {
  return walk(ast, function(node, replace) {
    if (node.type === 'Block') {
      var lastIdx = 0;
      var newNodes = [];
      node.nodes.forEach(function(innerNode, i) {
        if (innerNode.type === 'Block' && !innerNode.yield) {
          if (i > 0) newNodes = newNodes.concat(node.nodes.slice(lastIdx, i));
          lastIdx = i + 1;
          newNodes = newNodes.concat(cleanUpAST(innerNode).nodes);
        }
      });
      node.nodes = newNodes.concat(node.nodes.slice(lastIdx));
    }
  });
}
