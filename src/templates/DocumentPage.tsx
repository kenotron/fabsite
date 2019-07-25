import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

export const DocumentPage = (props: any) => {
  const doc = props.data.mdx;

  return (
    <div className="blog-post-container">
      <div className="blog-post">
        <h1>{doc.componentName}</h1>
        <MDXRenderer>{doc.body}</MDXRenderer>
      </div>
    </div>
  );
};

export default DocumentPage;

export const pageQuery = graphql`
  query DocumentPagePathBySlug($componentName: String!) {
    mdx(frontmatter: { title: { eq: $componentName } }) {
      frontmatter {
        title
      }
      body
    }
  }
`;
