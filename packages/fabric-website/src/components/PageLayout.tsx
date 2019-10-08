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
import { Card } from "./Card";
import Page from "../templates/DefaultTemplate";
import { StackItem } from "office-ui-fabric-react";

initializeIcons();

export default props => {
  console.log(props);
  const {
    pageContext: { frontmatter }
  } = props;

  return <Page>Hello</Page>;
};
