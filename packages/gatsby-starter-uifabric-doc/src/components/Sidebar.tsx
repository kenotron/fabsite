import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Nav } from 'office-ui-fabric-react';

function aggregateCategory(nodes) {
  const aggregate: { links: any[] } = { links: [] };
  const categories = {};
  nodes.forEach(node => {
    const { category } = node.frontmatter;

    categories[category] = categories[category] || {
      name: category,
      links: [],
      isExpanded: true
    };

    categories[category].links.push({
      name: node.frontmatter.title,
      url: node.frontmatter.path,
      key: node.fields.slug
    });

    aggregate.links.push(categories[category]);
  });

  return aggregate;
}

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
    }
  `);

  const {
    allMdx: { nodes }
  } = data;

  const groups = aggregateCategory(nodes);

  return (
    <div style={{ gridArea: 'sidebar' }}>
      <Nav
        selectedKey="key3"
        expandButtonAriaLabel="Expand or collapse"
        styles={{
          root: {
            width: '300px'
          }
        }}
        groups={[groups]}
      />
    </div>
  );
};
