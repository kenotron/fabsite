import React from 'react';
import { Text, Link } from 'office-ui-fabric-react';

export default (props: any) => {
  return (
    <div style={{ padding: 20, margin: 0, gridArea: 'head', display: 'flex', justifyContent: 'start', alignItems: 'baseline' }}>
      <Text as="h1" variant="xLarge">
        UI Fabric
      </Text>
      <div style={{ marginLeft: 20 }}>
        <Link href="/blog/getting-started">Get Started</Link>
      </div>
    </div>
  );
};
