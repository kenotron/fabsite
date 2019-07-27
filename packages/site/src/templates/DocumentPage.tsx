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
          <h1>{doc.componentName}</h1>
          <h2>Overview</h2>
          <MDXRenderer>{doc.overview[0].mdx.body}</MDXRenderer>

          <div style={{ display: 'flex' }}>
            <div>
              <h2>Do's</h2>
              <MDXRenderer>{doc.dos[0].mdx.body}</MDXRenderer>
            </div>

            <div>
              <h2>Dont's</h2>
              <MDXRenderer>{doc.donts[0].mdx.body}</MDXRenderer>
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
  query DocumentPagePathBySlug($componentName: String!) {
    mdx(frontmatter: { title: { eq: $componentName } }) {
      frontmatter {
        title
        overview
      }
      body
      overview: childrenDocOverview {
        mdx: childMdx {
          body
        }
      }

      dos: childrenDocDos {
        mdx: childMdx {
          body
        }
      }

      donts: childrenDocDonts {
        mdx: childMdx {
          body
        }
      }
    }
  }
`;
