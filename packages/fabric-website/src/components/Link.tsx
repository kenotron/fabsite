import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { Link as FabricLink } from 'office-ui-fabric-react';
const WrapperLink = (props: React.LinkHTMLAttributes<any>) => {
  const { href, ...rest } = props;
  return (
    <GatsbyLink to={href!} {...rest}>
      {props.children}
    </GatsbyLink>
  );
};

const Link = (props: any) => {
  return (
    <FabricLink as={WrapperLink} {...props}>
      {props.children}
    </FabricLink>
  );
};

export default Link;
