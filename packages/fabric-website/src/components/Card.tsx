import React from "react";
import { Text } from "office-ui-fabric-react";
import { Card as FabricCard } from "@uifabric/react-cards";

export const Card = (props: any) => {
  return (
    <FabricCard
      styles={{
        root: { marginTop: 16, background: "white", color: "#323130" }
      }}
      tokens={{ maxWidth: "100%", padding: 16 }}
    >
      <Text variant="xxLarge">{props.title}</Text>
      {props.children}
    </FabricCard>
  );
};
