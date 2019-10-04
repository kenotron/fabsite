import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Text } from "office-ui-fabric-react";

import "./Sidebar.css";

import Link from "./Link";

const NavItem = (props: any) => {
  return <li>{props.path && <Link href={props.path}>{props.title}</Link>}</li>;
};

const Nav = (props: any) => {
  return (
    <nav>
      <ul>
        {props.items.map(node => (
          <NavItem {...node.frontmatter} />
        ))}
      </ul>
    </nav>
  );
};

export default (props: any) => {
  const data = useStaticQuery(graphql`
    query SidebarQuery {
      allMdx {
        nodes {
          frontmatter {
            title
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

  return (
    <div style={{ gridArea: "sidebar" }}>
      <Nav items={nodes} />
    </div>
  );
};
