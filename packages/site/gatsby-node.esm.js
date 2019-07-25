import path from 'path';
import crypto from 'crypto';

exports.onCreateNode = ({ node, actions, createNodeId }) => {
  // const { createNode, createParentChildLink } = actions;
  // if (node && node.internal.type === 'Mdx' && node.frontmatter.path) {
  //   ['overview', 'dos', 'donts'].forEach(field => {
  //     const childNode = {
  //       id: createNodeId(`${node.id} >>> ${field}`),
  //       internal: {
  //         mediaType: 'text/mdx',
  //         type: `doc_${field}`,
  //         contentDigest: crypto
  //           .createHash(`md5`)
  //           .update(JSON.stringify(node.frontmatter[field]))
  //           .digest(`hex`),
  //         content: node.frontmatter[field]
  //       }
  //     };
  //     createNode(childNode);
  //     createParentChildLink({ parent: node, child: childNode });
  //   });
  // }
};

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;
  const docPage = path.resolve('src/templates/DocumentPage.tsx');
  const result = await graphql(`
    {
      allMdx(filter: { frontmatter: { path: { ne: null } } }) {
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

  const posts = result.data.allMdx.nodes;

  posts.forEach((post, index) => {
    console.log('CREATING PAGE: ' + post.frontmatter.path);

    createPage({
      path: post.frontmatter.path,
      component: docPage,
      context: {
        componentName: post.frontmatter.title
      }
    });
  });
};
