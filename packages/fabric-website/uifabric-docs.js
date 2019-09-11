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
  examples: [
    {
      title: 'Activity Items with Icons',
      code: resolveRead('office-ui-fabric-react/src/components/ActivityItem/examples/ActivityItem.Basic.Example.tsx'),
      view: 'office-ui-fabric-react/lib/components/ActivityItem/examples/ActivityItem.Basic.Example.js',
      name: 'ActivityItemBasicExample'
    },
    {
      title: 'Activity Items with Personas',
      code: resolveRead('office-ui-fabric-react/src/components/ActivityItem/examples/ActivityItem.Persona.Example.tsx'),
      view: 'office-ui-fabric-react/lib/components/ActivityItem/examples/ActivityItem.Persona.Example.js',
      name: 'ActivityItemPersonaExample'
    },
    {
      title: 'Compact Activity Items',
      code: resolveRead('office-ui-fabric-react/src/components/ActivityItem/examples/ActivityItem.Compact.Example.tsx'),
      view: 'office-ui-fabric-react/lib/components/ActivityItem/examples/ActivityItem.Compact.Example.js',
      name: 'ActivityItemCompactExample'
    }
  ],

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
