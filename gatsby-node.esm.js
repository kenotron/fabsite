import path from 'path';

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
