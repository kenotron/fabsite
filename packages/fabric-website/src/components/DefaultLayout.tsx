import React from "react";
import { Text, Link, Stack, FontWeights } from "office-ui-fabric-react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { MDXProvider } from "@mdx-js/react";
import Highlight, { defaultProps } from "prism-react-renderer";
import darkTheme from "prism-react-renderer/themes/nightOwl";

const HighlightHOC = p => {
  return (
    <Highlight
      {...defaultProps}
      theme={darkTheme}
      code={p.children}
      language="jsx"
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div className={className} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </div>
      )}
    </Highlight>
  );
};

const HighlightInlineHOC = p => {
  return (
    <Highlight
      {...defaultProps}
      theme={darkTheme}
      code={p.children}
      language="jsx"
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <code className={className} style={style}>
          {tokens.map((line, i) => (
            <span {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </span>
          ))}
        </code>
      )}
    </Highlight>
  );
};

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
    <MDXProvider
      components={{
        code: HighlightHOC,
        inlineCode: HighlightInlineHOC
      }}
    >
      <div className="defaultLayout" style={pageGridStyles}>
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
    </MDXProvider>
  );
};
