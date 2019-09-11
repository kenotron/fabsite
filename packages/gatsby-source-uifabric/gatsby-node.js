require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'es2017',
    allowJs: true,
    esModuleInterop: true
  },
  transpileOnly: true,
  files: true,

  // HERE, you can use RegExp literals here.
  ignore: [/node_modules\/(?!office-ui-fabric-react|\@uifabric|react-syntax-highlighter)/]
});

module.exports = {
  onCreateNode: require('./src/gatsby/createNode').createNode,
  sourceNodes: require('./src/gatsby/sourceNodes').sourceNodes
};
