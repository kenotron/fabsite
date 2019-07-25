'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const getImportsVariables_1 = require("./getImportsVariables");
const visit = require('unist-util-visit');
const u = require('unist-builder');
const modifyChildren = require('unist-util-modify-children');
function findAllImportVariables(tree) {
    let importVariables = [];
    visit(tree, visitor);
    return importVariables;
    function visitor(child, index, parent) {
        if (child.type === 'import') {
            importVariables = importVariables.concat(getImportsVariables_1.getImportsVariables(child.value));
        }
    }
}
function transformer(tree, files) {
    if (tree) {
        const importVariables = findAllImportVariables(tree);
        const modify = modifyChildren(modifier);
        modify(tree);
        function modifier(node, index, parent) {
            if (node.type === 'code' && node.meta === 'live=true') {
                parent.children.splice(index, 1, u('jsx', {
                    value: `<CodeBlock scope={{${importVariables.join(',')}}} live={true} className="language-${node.lang}">{\`${node.value}\`}</CodeBlock>`
                }));
                return index + 1;
            }
        }
    }
    return tree;
}
module.exports = function attacher() {
    return transformer;
};
