module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        remarkPlugins: [require("./src/remark-react-live/index")]
      }
    }
  ]
};
