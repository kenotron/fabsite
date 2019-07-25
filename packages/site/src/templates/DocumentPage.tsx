import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';

import CodeBlock from '../components/CodeBlock';
const components = {
  pre: props => <div {...props} />,
  CodeBlock
};

export const DocumentPage = (props: any) => {
  const doc = props.data.mdx;

  return (
    <MDXProvider components={components}>
      <div className="blog-post-container">
        <div className="blog-post">
          <h1>{doc.componentName}</h1>
          <MDXRenderer>{doc.body}</MDXRenderer>
        </div>
      </div>
    </MDXProvider>
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
