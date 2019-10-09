import '../../static/assets/reset.css';
import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import { Stack, Text, initializeIcons, List, Icon, Image } from 'office-ui-fabric-react';
import { Card } from '../components/Card';
import Page from './DefaultTemplate';
import md2jsx from '../md2jsx';
import { StackItem } from 'office-ui-fabric-react';

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

const onRenderExample = (item, index) => {
  return (
    <Stack tokens={{ childrenGap: 16 }}>
      <Text>{item.name}</Text>
      <Image src={item.image} />
    </Stack>
  );
};

export default props => {
  const {
    data: { mdx }
  } = props;

  const { title, implementation, ...sections } = mdx.frontmatter;

  return (
    <Page>
      <Stack style={{ gridArea: 'main' }} tokens={{ childrenGap: 16 }}>
        <Text as="h1" variant="xxLargePlus">
          {mdx.frontmatter.title}
        </Text>

        {Object.keys(sections).map(section => {
          const sectionMd = sections[section];
          return <Card>{md2jsx(sectionMd)}</Card>;
        })}

        <Card>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </Card>

        <Card>
          <List onRenderCell={onRenderExample} items={mdx.frontmatter.implementation} />
        </Card>
      </Stack>
    </Page>
  );
};

export const pageQuery = graphql`
  query ComponentDocumentPagePathBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        overview
        layout
        content
        accessibility
        globalization
        behavior
      }
      body
    }
  }
`;
