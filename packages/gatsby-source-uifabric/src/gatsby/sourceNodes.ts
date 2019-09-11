import path from 'path';
import glob from 'glob';

import { SourceNodesArgs } from 'gatsby';
import registerRawLoader from '../polyfill/registerRawLoader';

const restoreLoader = registerRawLoader();

export const sourceNodes = ({ actions, createNodeId, createContentDigest }: SourceNodesArgs) => {
  const { createNode } = actions;

  const oufrComponentsPath = path.join(path.dirname(require.resolve('office-ui-fabric-react/package.json')), 'lib-commonjs/components');

  console.log('globbing');

  const componentDocPaths = glob.sync(oufrComponentsPath + '/**/*.doc.js');

  console.log('extracting info');

  for (let componentDocPath of componentDocPaths) {
    let componentDocProps = null;

    try {
      componentDocProps = require(componentDocPath);
    } catch (e) {
      continue;
    }

    if (!componentDocProps) {
      continue;
    }

    const componentDoc = componentDocProps[Object.keys(componentDocProps)[0]];

    if (componentDoc.componentName) {
      console.log(`Extracting documentation for ${componentDoc.componentName}`);
      try {
        for (let prop of Object.keys(componentDoc)) {
          if (typeof componentDoc[prop] === 'object') {
            if (componentDoc[prop].default) {
              componentDoc[prop] = componentDoc[prop].default;
            } else {
              delete componentDoc[prop];
            }
          }
        }

        // Data can come from anywhere, but for now create it manually
        const nodeContent = JSON.stringify(componentDoc);

        const nodeMeta = {
          id: createNodeId(`uifabric-component-${componentDoc.componentName}`),
          parent: null,
          children: [],
          internal: {
            type: `ComponentDoc`,
            mediaType: `text/html`,
            content: nodeContent,
            contentDigest: createContentDigest(componentDoc)
          }
        };

        const node = Object.assign({}, componentDoc, nodeMeta);
        createNode(node);
      } catch (e) {
        console.warn(`Something went wrong with this component: ${componentDoc.componentName}`);
      }
    }
  }

  restoreLoader();
};
