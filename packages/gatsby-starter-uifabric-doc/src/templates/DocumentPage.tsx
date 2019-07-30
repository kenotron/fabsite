import '../../static/assets/reset.css';
import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import md2jsx from '../md2jsx';
import { Stack, Text, initializeIcons } from 'office-ui-fabric-react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

initializeIcons();
const components = {
  pre: props => <div {...props} />
};

const pageGridStyles = {
  gridTemplateAreas: '"head head" "sidebar main"',
  gridTemplateRows: '50px 1fr',
  gridTemplateColumns: '300px 1024px',

  display: 'grid'
};

const DocumentPage = (props: any) => {
  return (
    <MDXProvider components={components}>
      <div style={pageGridStyles}>
        <Header />
        <Sidebar />
        <Main doc={props.data.mdx} />
      </div>
    </MDXProvider>
  );
};

const Main = (props: any) => {
  const { doc } = props;
  return (
    <Stack maxWidth={800} style={{ margin: '0 auto 40px', width: '100%', gridArea: 'main' }}>
      <Text as="h1" variant="xxLargePlus">
        {doc.frontmatter.title}
      </Text>

      <Text>{md2jsx(doc.frontmatter.overview)}</Text>
      {(doc.frontmatter.dos || doc.frontmatter.donts) && (
        <Stack horizontal gap={20}>
          <div style={{ flexBasis: '0', flexGrow: 1 }}>
            <Text as="h3" variant="xLarge">
              Do's
            </Text>
            <Text>{md2jsx(doc.frontmatter.dos)}</Text>
          </div>

          <div style={{ flexBasis: '0', flexGrow: 1 }}>
            <Text as="h3" variant="xLarge">
              Dont's
            </Text>
            <Text>{md2jsx(doc.frontmatter.donts)}</Text>
          </div>
        </Stack>
      )}

      <Text>
        <MDXRenderer>{doc.body}</MDXRenderer>
      </Text>
    </Stack>
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
