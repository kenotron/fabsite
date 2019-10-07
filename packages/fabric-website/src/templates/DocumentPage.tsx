import "../../static/assets/reset.css";
import React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import {
  Stack,
  Text,
  initializeIcons,
  List,
  Icon,
  Image
} from "office-ui-fabric-react";
import { Card } from "../components/Card";
import DefaultLayout from "../components/DefaultLayout";
import { StackItem } from "office-ui-fabric-react";

initializeIcons();

const components = {
  pre: props => <div {...props} />
};

const pageGridStyles = {
  gridTemplateAreas: '"head head" "sidebar main"',
  gridTemplateRows: "50px 1fr",
  gridTemplateColumns: "300px 1024px",

  display: "grid"
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
  return (
    <DefaultLayout>
      <Stack style={{ gridArea: "main" }} tokens={{ childrenGap: 16 }}>
        <Text as="h1" variant="xxLargePlus">
          {mdx.frontmatter.title}
        </Text>

        <Card>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </Card>
        <Card>
          <Stack horizontal tokens={{ childrenGap: 24 }}>
            <StackItem styles={{ root: { flexBasis: "50%" } }}>
              <List
                onRenderCell={(item, index) => (
                  <div key={index} style={{ marginBottom: 16 }}>
                    <Icon
                      styles={{ root: { marginRight: 4, color: "green" } }}
                      iconName="CheckMark"
                    />
                    <Text>{item}</Text>
                  </div>
                )}
                items={mdx.frontmatter.dos}
              />
            </StackItem>
            <StackItem styles={{ root: { flexBasis: "50%" } }}>
              <List
                onRenderCell={(item, index) => (
                  <div key={index} style={{ marginBottom: 16 }}>
                    <Icon
                      styles={{ root: { marginRight: 4, color: "red" } }}
                      iconName="StatusCircleErrorX"
                    />
                    <Text>{item}</Text>
                  </div>
                )}
                items={mdx.frontmatter.donts}
              />
            </StackItem>
          </Stack>
        </Card>
        <Card>
          <List
            onRenderCell={onRenderExample}
            items={mdx.frontmatter.implementation}
          />
        </Card>
      </Stack>
    </DefaultLayout>
  );
};

export const pageQuery = graphql`
  query ComponentDocumentPagePathBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        dos
        donts
        implementation {
          image
          name
        }
        title
      }
      body
    }
  }
`;
