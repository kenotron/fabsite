module.exports = {
  siteMetadata: {
    title: 'Fabric Website 2.0',
    description: 'UI Fabric is the World Famous Fluent Component Library'
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-remark-react-live`,
    `gatsby-plugin-netlify-cms`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/docs`,
        name: 'docs'
      }
    }
  ]
};
