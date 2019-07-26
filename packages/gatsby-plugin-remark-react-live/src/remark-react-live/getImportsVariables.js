const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const get = require('lodash/get');

const fromSpecifiers = (specifiers = []) => {
  return Array.isArray(specifiers) && specifiers.length > 0 ? specifiers.map(specifier => get(specifier, 'local.name')) : [];
};

const traverseOnImports = fn => code => {
  try {
    const ast = parser.parse(code, { sourceType: 'module' });

    let populated = [];

    traverse(ast, {
      enter(path) {
        if (path.isImportDeclaration()) {
          populated = populated.concat(fn(path));
          return;
        }
      }
    });

    return populated;
  } catch (err) {
    return [];
  }
};

exports.getImportsVariables = traverseOnImports(path => fromSpecifiers(path.node.specifiers));
