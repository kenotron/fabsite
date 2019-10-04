import React from "react";
import { Text, Link, Stack, FontWeights } from "office-ui-fabric-react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const pageGridStyles = {
  background: "#faf9f8",
  gridTemplateAreas: '"head head" "sidebar main"',
  gridTemplateRows: "50px 1fr",
  gridTemplateColumns: "300px 1fr",
  display: "grid",
  width: "100vw",
  height: "100vh"
};

export default props => {
  return (
    <div style={pageGridStyles}>
      <Header />
      <Sidebar />
      <Stack
        styles={{
          root: {
            margin: "20px 40px",
            color: "#605e5c",
            height: "100%"
          }
        }}
        tokens={{ childrenGap: 15 }}
      >
        <Text>{props.children}</Text>
      </Stack>
    </div>
  );
};
