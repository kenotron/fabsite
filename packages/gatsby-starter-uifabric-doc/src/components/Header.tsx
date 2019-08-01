import React from 'react';
import { Helmet } from 'react-helmet';
import { Text, Link } from 'office-ui-fabric-react';
import { useStaticQuery, graphql } from 'gatsby';

export default (props: any) => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);

  return (
    <div style={{ padding: 20, margin: 0, gridArea: 'head', display: 'flex', justifyContent: 'start', alignItems: 'baseline' }}>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="Description" content={data.site.siteMetadata.description} />
        <title>{data.site.siteMetadata.title}</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Text as="h1" variant="xLarge">
        UI Fabric
      </Text>
      <div style={{ marginLeft: 25 }}>
        <Link style={{ marginRight: 15 }} href="/">
          Home
        </Link>
        <Link href="/getting-started">Get Started</Link>
      </div>
    </div>
  );
};
