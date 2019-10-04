const path = require("path");

exports.createPages = async ({ actions, graphql }) => {
  await createMDXPages({ actions, graphql });
};

async function createMDXPages({ actions, graphql }) {
  const { createPage } = actions;
  const blogEntry = path.resolve("src/templates/BlogEntry.tsx");
  const result = await graphql(`
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
  `);

  if (result.errors) {
    return Promise.reject(result.errors);
  }

  const posts = result.data.allMarkdownRemark.edges;

  for (let post of posts) {
    await createPage({
      path: post.node.frontmatter.path,
      component: blogEntry,
      context: {
        slug: post.node.frontmatter.path
      }
    });
  }
}
