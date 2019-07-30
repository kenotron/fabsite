import React from 'react';
import {Text, Link, Stack,} from 'office-ui-fabric-react';
import { graphql } from 'gatsby';

interface IIndexProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
      };
    };
    allMdx: {
      edges: {
        node: {
          excerpt: string;
          frontmatter: {
            title: string;
            path: string;
          };
        };
      }[];
    };
  };
}

export default (props: IIndexProps) => {
  const { data } = props;
  const posts = data.allMdx.edges;
  return (
    <Stack maxWidth={600} style={{margin: 'auto'}}>
      <Text as="h1" variant="xxLargePlus">Welcome to {data.site.siteMetadata.title}</Text>
      <ul style={{padding: '0'}}>
        {posts.map((post, i) => {
          const {
            node: {
              frontmatter: { title, path },
              excerpt
            }
          } = post;
          return (
            <li style={{listStyle: 'none'}} key={i}>
              <h3>
                <Link href={path}>{title}</Link>
              </h3>
              <Text> {excerpt} </Text>
            </li>
          );
        })}
      </ul>
    </Stack>
  );
};

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx {
      edges {
        node {
          excerpt
          frontmatter {
            title
            path
          }
        }
      }
    }
  }
`;
