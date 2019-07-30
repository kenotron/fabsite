import React from 'react';
import { graphql } from 'gatsby';
import Header from '../components/Header';

export const BlogEntry = (props: any) => {
  const post = props.data.markdownRemark;

  return (
    <div>
      <Header />
      <div className="blog-post-container">
        <div className="blog-post" dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
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
