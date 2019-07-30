import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import md2jsx from '../md2jsx';
import {Stack, Text, initializeIcons} from 'office-ui-fabric-react';

initializeIcons();
const components = {
  pre: props => <div {...props} />
};

const DocumentPage = (props: any) => {
  const doc = props.data.mdx;
  return (
    <MDXProvider components={components}>
       <Stack maxWidth={800} style={{margin: '0 auto 40px'}}>
       <Text as="h1" variant="xxLargePlus">{doc.frontmatter.title}</Text>
          <Text as="h2" variant="xxLarge">Overview</Text>
          <Text>{md2jsx(doc.frontmatter.overview)}</Text>
          {doc.frontmatter.dos || doc.frontmatter.donts &&
            <Stack horizontal gap={20} >
              <div style={{flexBasis:'0', flexGrow: 1}}>
                <Text as="h3" variant="xLarge">Do's</Text>
                <Text>{md2jsx(doc.frontmatter.dos)}</Text>
              </div>

              <div style={{flexBasis:'0', flexGrow: 1}}>
                <Text as="h3" variant="xLarge">Dont's</Text>
                <Text>{md2jsx(doc.frontmatter.donts)}</Text>
              </div>
            </Stack>
          }

         <Text><MDXRenderer>{doc.body}</MDXRenderer></Text> 
      </Stack>
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
