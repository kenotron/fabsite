const path = require('path');

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;
  const blogEntry = path.resolve('src/templates/BlogEntry.tsx');
  return graphql(`
    {
      allMarkdownRemark {
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

    const posts = result.data.allMarkdownRemark.edges;

    posts.forEach((post, index) => {
      createPage({
        path: post.node.frontmatter.path,
        component: blogEntry,
        context: {
          slug: post.node.frontmatter.path
        }
      });
    });

    return null;
  });
};
