import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

export const DocumentPage = (props: any) => {
  const post = props.data.mdx;

  return (
    <div className="blog-post-container">
      <div className="blog-post">
        <MDXRenderer>{post.rawBody}</MDXRenderer>
      </div>
    </div>
  );
};

export default DocumentPage;

export const pageQuery = graphql`
  query DocumentPagePathBySlug($slug: String!) {
    mdx(frontmatter: { path: { eq: $slug } }) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
      rawBody
    }
  }
`;
