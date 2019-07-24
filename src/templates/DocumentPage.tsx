import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

export const DocumentPage = (props: any) => {
  const { pageProps: doc, overview, dos, donts } = props.data.componentDoc;

  return (
    <div className="blog-post-container">
      <div className="blog-post">
        <h1>{doc.componentName}</h1>
        <MDXRenderer>{overview.mdx.body}</MDXRenderer>
        <MDXRenderer>{dos.mdx.body}</MDXRenderer>
        <MDXRenderer>{donts.mdx.body}</MDXRenderer>
      </div>
    </div>
  );
};

export default DocumentPage;

export const pageQuery = graphql`
  query DocumentPagePathBySlug($componentName: String!) {
    componentDoc(pageProps: { componentName: { eq: $componentName } }) {
      pageProps {
        componentName
        componentUrl
        examples {
          code
          title
        }
      }
      id
      overview: childOverview {
        mdx: childMdx {
          body
        }
      }

      dos: childDos {
        mdx: childMdx {
          body
        }
      }

      donts: childDonts {
        mdx: childMdx {
          body
        }
      }
    }
  }
`;
