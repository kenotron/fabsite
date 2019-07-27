import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import md2jsx from '../md2jsx';

const components = {
  pre: props => <div {...props} />
};

const DocumentPage = (props: any) => {
  const doc = props.data.mdx;
  console.log(doc);
  return (
    <MDXProvider components={components}>
      <div className="blog-post-container">
        <div className="blog-post">
          <h1>{doc.frontmatter.title}</h1>
          <h2>Overview</h2>
          {md2jsx(doc.frontmatter.overview)}
          <div style={{ display: 'flex' }}>
            <div>
              <h2>Do's</h2>
              {md2jsx(doc.frontmatter.dos)}
            </div>

            <div>
              <h2>Dont's</h2>
              {md2jsx(doc.frontmatter.donts)}
            </div>
          </div>

          <MDXRenderer>{doc.body}</MDXRenderer>
        </div>
      </div>
    </MDXProvider>
  );
};

export default DocumentPage;

export const pageQuery = graphql`
  query ComponentDocumentPagePathBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        overview
        dos
        donts
      }
      fields {
        slug
      }
      body
    }
  }
`;
