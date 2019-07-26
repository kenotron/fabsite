import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';

const components = {
  pre: props => <div {...props} />
};

export const DocumentPage = (props: any) => {
  const doc = props.data.mdx;

  return (
    <MDXProvider components={components}>
      <div className="blog-post-container">
        <div className="blog-post">
          <h1>{doc.componentName}</h1>
          <h2>Overview</h2>
          <MDXRenderer>{doc.overview.mdx.body}</MDXRenderer>

          <div style={{ display: 'flex' }}>
            <div>
              <h2>Do's</h2>
              <MDXRenderer>{doc.dos.mdx.body}</MDXRenderer>
            </div>

            <div>
              <h2>Dont's</h2>
              <MDXRenderer>{doc.donts.mdx.body}</MDXRenderer>
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
      overview: childDocOverview {
        mdx: childMdx {
          body
        }
      }

      dos: childDocDos {
        mdx: childMdx {
          body
        }
      }

      donts: childDocDonts {
        mdx: childMdx {
          body
        }
      }
    }
  }
`;
