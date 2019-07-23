import fs from 'fs';

function resolveRead(request) {
  try {
    const filePath = require.resolve(request);
    return fs.readFileSync(filePath, 'utf-8');
  } catch (e) {
    return null;
  }
}

const ActivityItemPageProps = {
  examples: {
    ActivityItemBasicExampleCode: resolveRead('office-ui-fabric-react/src/components/ActivityItem/examples/ActivityItem.Basic.Example.tsx'),
    ActivityItemPersonaExampleCode: resolveRead(
      'office-ui-fabric-react/src/components/ActivityItem/examples/ActivityItem.Persona.Example.tsx'
    ),
    ActivityItemCompactExampleCode: resolveRead(
      'office-ui-fabric-react/src/components/ActivityItem/examples/ActivityItem.Compact.Example.tsx'
    )
  },

  componentUrl:
    'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/ActivityItem',

  title: 'ActivityItem',
  componentName: 'ActivityItem',
  overview: resolveRead('office-ui-fabric-react/src/components/ActivityItem/docs/ActivityItemOverview.md'),
  bestPractices: '',
  dos: resolveRead('office-ui-fabric-react/src/components/ActivityItem/docs/ActivityItemDos.md'),
  donts: resolveRead('office-ui-fabric-react/src/components/ActivityItem/docs/ActivityItemDonts.md')
};

export { ActivityItemPageProps };
