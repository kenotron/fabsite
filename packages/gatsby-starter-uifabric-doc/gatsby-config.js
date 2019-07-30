module.exports = {
  siteMetadata: {
    title: 'Fabric Website 2.0',
    description: 'UI Fabric is the World Famous Fluent Component Library'
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `content/blog`,
        name: 'blog'
      }
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-theme-live-doc`,
      options: {}
    },

    `gatsby-plugin-netlify-cms`
  ]
};
