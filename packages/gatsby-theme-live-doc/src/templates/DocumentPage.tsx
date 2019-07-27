import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';

const components = {
  pre: props => <div {...props} />
};

export const DocumentPage = (props: any) => {
  const doc = props.data.mdx;
  console.log(doc);
  return (
    <MDXProvider components={components}>
      <div className="blog-post-container">
        <div className="blog-post">
          <MDXRenderer>{doc.body}</MDXRenderer>
        </div>
      </div>
    </MDXProvider>
  );
};

export default DocumentPage;

export const pageQuery = graphql`
  query DocumentPagePathBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
      }
      fields {
        slug
      }
      body
    }
  }
`;
