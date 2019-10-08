const path = require("path");

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (
    node.internal.type === `Mdx` &&
    node.frontmatter &&
    node.frontmatter.path
  ) {
    const value = slugify(node.frontmatter.title);
    createNodeField({
      name: `slug`,
      node,
      value
    });
  }
};

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;
  const docPage = path.resolve("src/templates/ComponentTemplate.tsx");
  const result = await graphql(`
    {
      allMdx(filter: { frontmatter: { path: { ne: null } } }) {
        nodes {
          frontmatter {
            path
            title
          }
          fields {
            slug
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
    createPage({
      path: post.frontmatter.path,
      component: docPage,
      context: {
        slug: post.fields.slug
      }
    });
  });
};

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}
