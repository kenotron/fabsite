import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

export const DocumentPage = (props: any) => {
  const { pageProps: doc, overview, dos, donts } = props.data.componentDoc;

  return (
    <div className="blog-post-container">
      <div className="blog-post">
        <h1>{doc.componentName}</h1>
        <MDXRenderer>{doc.mdx.body}</MDXRenderer>
      </div>
    </div>
  );
};

export default DocumentPage;

export const pageQuery = graphql`
  query DocumentPagePathBySlug($componentName: String!) {
    mdx(frontmatter: { path: { eq: $componentName } }) {
      frontmatter {
        title
      }

      body
    }
  }
`;
