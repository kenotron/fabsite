const { getImportsVariables } = require('./getImportsVariables');

const visit = require('unist-util-visit');
const u = require('unist-builder');
const modifyChildren = require('unist-util-modify-children');

function findAllImportVariables(tree) {
  let importVariables = [];
  visit(tree, visitor);
  return importVariables;

  function visitor(child, index, parent) {
    if (child.type === 'import') {
      importVariables = importVariables.concat(getImportsVariables(child.value));
    }
  }
}

function transformer(tree, files) {
  if (tree) {
    const importVariables = findAllImportVariables(tree);
    const modify = modifyChildren(modifier);
    let importAdded = false;

    modify(tree);

    function modifier(node, index, parent) {
      if (parent.type === 'root' && !importAdded) {
        importAdded = true;
        parent.children.splice(
          index,
          0,
          u('import', { value: `import CodeBlock from 'gatsby-plugin-remark-react-live/src/components/CodeBlock';` })
        );
        return index;
      }

      const meta = parseMeta(node.meta);

      if (node.type === 'code' && meta.live) {
        parent.children.splice(
          index,
          1,
          u('jsx', {
            value: `<CodeBlock scope={{${importVariables.join(',')}}} live={true} className="language-${node.lang}" noInline={${
              meta.noInline
            }}>{\`${node.value}\`}</CodeBlock>`
          })
        );
        return index + 1;
      }
    }
  }

  return tree;
}

function parseMeta(meta) {
  const info = {};

  if (meta) {
    const splitBySpace = meta.split(/\s+/);
    splitBySpace.forEach(entry => {
      const pair = entry.split(/=/);
      if (pair.length === 2) {
        info[pair[0]] = pair[1];
      } else {
        info[pair[0]] = true;
      }
    });
  }
  return info;
}

module.exports = function attacher() {
  return transformer;
};
