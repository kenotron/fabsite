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

const ComponentPage = (props: any) => {
  return (
    <MDXProvider components={components}>
      <div style={pageGridStyles}>
        <Header />
        <Sidebar />
        <Main doc={props.data.strapiComponent} />
      </div>
    </MDXProvider>
  );
};

const Main = (props: any) => {
  const { doc } = props;
  return (
    <Stack maxWidth={800} style={{ margin: '0 auto 40px', width: '100%', gridArea: 'main' }}>
      <Text as="h1" variant="xxLargePlus">
        {doc.title}
      </Text>
      <Text>{md2jsx(doc.description)}</Text>
      <Text>{md2jsx(doc.guidelines)}</Text>
    </Stack>
  );
};

export default ComponentPage;

export const pageQuery = graphql`
  query ComponentDocById($id: String!) {
    strapiComponent(id: { eq: $id }) {
      title
      description
      guidelines
    }
  }
`;
