import path from 'path';
import fs from 'fs';

import * as uifabricDocs from './uifabric-docs';

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions;
  for (let pageProps of Object.values(uifabricDocs)) {
    createNode({
      id: createNodeId(`UIFabricDoc:${pageProps.componentName}`),
      parent: null,
      children: [],
      pageProps,
      internal: {
        mediaType: 'html',
        type: 'componentDoc',
        contentDigest: createContentDigest(pageProps)
      }
    });
  }
};

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;
  const DocumentPagePath = path.resolve('src/templates/DocumentPage.tsx');
  return graphql(`
    {
      allMdx(sort: { order: DESC, fields: [frontmatter___date] }, limit: 1000) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    const posts = result.data.allMdx.edges;

    posts.forEach((post, index) => {
      createPage({
        path: post.node.frontmatter.path,
        component: DocumentPagePath,
        context: {
          slug: post.node.frontmatter.path
        }
      });
    });

    return null;
  });
};
