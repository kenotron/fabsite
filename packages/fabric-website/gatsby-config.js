module.exports = {
  siteMetadata: {
    title: "Fabric Website 2.0",
    description: "UI Fabric is the World Famous Fluent Component Library"
  },
  plugins: [
    `gatsby-transformer-sharp`,
    `gatsby-plugin-netlify-cms`,
    `gatsby-theme-live-doc`,
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [`gatsby-remark-images`]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `content/components`,
        name: "components"
      }
    },
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
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        defaultLayouts: {
          default: require.resolve("./src/components/DefaultLayout.tsx")
        },
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 400,
              withWebp: true,
              tracedSVG: true,
              linkImagesToOriginal: false
            }
          },
          {
            resolve: `gatsby-remark-copy-linked-files`
          }
        ]
      }
    }
  ]
};
