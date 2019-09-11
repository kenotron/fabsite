import React from 'react';
import { graphql } from 'gatsby';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import {Text} from "office-ui-fabric-react";  

const pageGridStyles = {
  gridTemplateAreas: '"head head" "sidebar main"',
  gridTemplateRows: '50px 1fr',
  gridTemplateColumns: '300px 1fr',

  display: 'grid'
};

export const BlogEntry = (props: any) => {
  const post = props.data.markdownRemark;

  return (
    <div style={pageGridStyles}>
      <Header />
      <Sidebar />
      <Text className="blog-post-container">
        <div className="blog-post" dangerouslySetInnerHTML={{ __html: post.html }} />
      </Text>
    </div>
  );
};

export default BlogEntry;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(frontmatter: { path: { eq: $slug } }) {
      frontmatter {
        title
      }
      html
    }
  }
`;
