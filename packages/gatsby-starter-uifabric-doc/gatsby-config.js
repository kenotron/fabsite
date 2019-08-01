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
    `gatsby-plugin-netlify-cms`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Fabric Website 2.0`,
        short_name: `fabricwebsite`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`
      }
    },
    'gatsby-plugin-offline'
  ]
};
