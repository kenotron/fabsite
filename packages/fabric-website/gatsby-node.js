const path = require('path');

exports.createPages = async ({ actions, graphql }) => {
  await createMDXPages({ actions, graphql });
  await createStrapiPages({ actions, graphql });
};

async function createMDXPages({ actions, graphql }) {
  const { createPage } = actions;
  const blogEntry = path.resolve('src/templates/BlogEntry.tsx');
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

async function createStrapiPages({ actions, graphql }) {
  const { createPage } = actions;
  const entry = path.resolve('src/templates/ComponentPage.tsx');

  const result = await graphql(`
    {
      allStrapiComponent {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  `);

  if (result.errors) {
    return Promise.reject(result.errors);
  }

  const posts = result.data.allStrapiComponent.edges;

  for (let post of posts) {
    await createPage({
      path: post.node.title.toLowerCase(),
      component: entry,
      context: {
        id: post.node.id
      }
    });
  }
}
