import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Text } from 'office-ui-fabric-react';

import './Sidebar.css';

import Link from './Link';

function aggregateCategory(nodes) {
  const aggregate: { links: any[] } = { links: [] };
  const categories = {};
  nodes.forEach(node => {
    const { category } = node.frontmatter;

    if (!categories[category]) {
      categories[category] = {
        name: category,
        links: []
      };

      aggregate.links.push(categories[category]);
    }

    categories[category].links.push({
      name: node.frontmatter.title,
      url: node.frontmatter.path,
      key: node.fields.slug
    });
  });

  aggregate.links = aggregate.links.sort();

  return aggregate;
}

const NavItem = (props: any) => {
  return (
    <li>
      {props.url && <Link href={props.url}>{props.name}</Link>}
      {!props.url && <Text variant="large">{props.name}</Text>}
      {props.links && (
        <ul>
          {props.links.map(link => (
            <NavItem {...link} />
          ))}
        </ul>
      )}
    </li>
  );
};

const Nav = (props: any) => {
  return (
    <nav>
      <ul>{props.groups.map(group => group.links.map(link => <NavItem {...link} />))}</ul>
    </nav>
  );
};

export default (props: any) => {
  const data = useStaticQuery(graphql`
    query SidebarQuery {
      allMdx(filter: { frontmatter: { category: { ne: null } } }) {
        nodes {
          frontmatter {
            title
            category
            path
          }
          fields {
            slug
          }
        }
      }

      allMarkdownRemark {
        nodes {
          frontmatter {
            title
            path
          }
        }
      }
    }
  `);

  const {
    allMdx: { nodes },
    allMarkdownRemark: { nodes: blogNodes }
  } = data;

  const groups = aggregateCategory(nodes);

  groups.links.push({
    name: 'Posts',
    links: blogNodes.map(blog => ({
      name: blog.frontmatter.title,
      url: blog.frontmatter.path,
      key: blog.frontmatter.title
    })),
    isExpanded: true
  });

  return (
    <div style={{ gridArea: 'sidebar' }}>
      <Nav groups={[groups]} />
    </div>
  );
};
