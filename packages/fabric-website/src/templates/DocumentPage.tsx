import "../../static/assets/reset.css";
import React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import { Stack, Text, initializeIcons } from "office-ui-fabric-react";
import DefaultLayout from "../components/DefaultLayout";

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

export default props => {
  const {
    data: { mdx }
  } = props;
  return (
    <DefaultLayout>
      <Stack style={{ gridArea: "main" }}>
        <Text as="h1" variant="xxLargePlus">
          {mdx.frontmatter.title}
        </Text>

        <Text>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </Text>
      </Stack>
    </DefaultLayout>
  );
};

export const pageQuery = graphql`
  query ComponentDocumentPagePathBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
      }
      fields {
        slug
      }
      body
    }
  }
`;
