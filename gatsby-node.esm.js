import path from 'path';
import crypto from 'crypto';

exports.onCreateNode = ({ node, actions, createNodeId }) => {
  const { createNode, createParentChildLink } = actions;
  if (node && node.internal.type === 'Mdx' && node.fileAbsolutePath && node.fileAbsolutePath.includes('content/docs')) {
    ['overview', 'dos', 'donts'].forEach(field => {
      const childNode = {
        id: createNodeId(`${node.id}>>>${field}`),
        internal: {
          mediaType: 'text/markdown',
          type: `doc_${field}`,
          contentDigest: crypto
            .createHash(`md5`)
            .update(JSON.stringify(node.frontmatter[field]))
            .digest(`hex`),
          content: node.frontmatter[field]
        }
      };
      createNode(childNode);
      createParentChildLink({ parent: node, child: childNode });
    });
  }
};

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;
  const docPage = path.resolve('src/templates/DocumentPage.tsx');
  const result = await graphql(`
    {
      allMdx {
        nodes {
          frontmatter {
            path
            title
          }
        }
      }
    }
  `);

  if (result.errors) {
    return Promise.reject(result.errors);
  }

  const posts = result.data.allMdx.edges;

  posts.forEach((post, index) => {
    createPage({
      path: post.node.frontmatter.path,
      component: docPage,
      context: {
        componentName: post.node.frontmatter.title
      }
    });
  });
};
