import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import vsDarkTheme from 'prism-react-renderer/themes/vsDark';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
export default props => {
  const { children, className, live, scope, noInline } = props;

  const language = className.replace(/language-/, '');
  if (live) {
    return (
      <div style={{ margin: '40px 0' }}>
        <LiveProvider code={children} scope={scope} noInline={noInline} theme={vsDarkTheme}>
          <div style={{ display: 'flex' }}>
            <div style={{ flexGrow: 1, background: '#333', color: 'white', marginRight: 20 }}>
              <LiveEditor />
            </div>
            <div style={{ flexBasis: 250 }}>
              <LivePreview />
            </div>
          </div>
          <div style={{ fontSize: 10, color: 'red' }}>
            <LiveError />
          </div>
        </LiveProvider>
      </div>
    );
  }
  return (
    <Highlight {...defaultProps} code={children} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, padding: '20px' }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};
