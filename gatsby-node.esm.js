import path from 'path';
import mdx from '@mdx-js/mdx';
import fs from 'fs';

import * as uifabricDocs from './uifabric-docs';

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions;
  for (let pageProps of Object.values(uifabricDocs)) {
    const pageId = createNodeId(`uifabric:componentdoc:${pageProps.componentName}`);
    const overviewId = createNodeId(`uifabric:componentdoc:overview:${pageProps.componentName}`);
    const dosId = createNodeId(`uifabric:componentdoc:dos:${pageProps.componentName}`);
    const dontsId = createNodeId(`uifabric:componentdoc:donts:${pageProps.componentName}`);

    createNode({
      id: overviewId,
      parent: pageId,
      children: [],
      internal: {
        mediaType: 'text/markdown',
        type: 'overview',
        contentDigest: createContentDigest(pageProps.overview),
        content: pageProps.overview
      }
    });

    createNode({
      id: dosId,
      parent: pageId,
      children: [],
      internal: {
        mediaType: 'text/markdown',
        type: 'dos',
        contentDigest: createContentDigest(pageProps.dos),
        content: pageProps.dos
      }
    });

    createNode({
      id: dontsId,
      parent: pageId,
      children: [],
      internal: {
        mediaType: 'text/markdown',
        type: 'donts',
        contentDigest: createContentDigest(pageProps.donts),
        content: pageProps.donts
      }
    });

    createNode({
      id: pageId,
      parent: null,
      children: [overviewId, dosId, dontsId],
      pageProps,
      internal: {
        mediaType: 'text/markdown',
        type: 'componentDoc',
        contentDigest: createContentDigest(pageProps)
      }
    });
  }

  console.log('done');
};

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;
  const DocumentPagePath = path.resolve('src/templates/DocumentPage.tsx');
  return graphql(`
    query AllComponentDocQuery {
      allComponentDoc {
        nodes {
          pageProps {
            componentName
          }
          id
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    const docs = result.data.allComponentDoc.nodes;

    docs.forEach((doc, index) => {
      createPage({
        path: '/components/' + doc.pageProps.componentName,
        component: DocumentPagePath,
        context: {
          componentName: doc.pageProps.componentName
        }
      });
    });

    return null;
  });
};
