import React from 'react';
import {Text, Link, Stack,} from 'office-ui-fabric-react';
import { graphql } from 'gatsby';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar'; 

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

const pageGridStyles = {
  gridTemplateAreas: '"head head" "sidebar main"',
  gridTemplateRows: '50px 1fr',
  gridTemplateColumns: '300px 1fr',
  display: 'grid'
};




export default (props: IIndexProps) => {
  const { data } = props;
  const posts = data.allMdx.edges;
  return (
    <div style={pageGridStyles}>
        <Header />
        <Sidebar />     
    <Stack>
      <Text as="h1" variant="xxLargePlus">Welcome to {data.site.siteMetadata.title}</Text>
    </Stack>
    </div>
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
