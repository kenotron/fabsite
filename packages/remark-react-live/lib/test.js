"use strict";
const u = require('unist-builder');
const attacher = require('.');
const tree = u('root', [
    u('import', { value: "import { Toggle } from 'office-ui-fabric-react';" }),
    u('import', { value: "import { ActivityItem } from 'office-ui-fabric-react';" }),
    u('code', { lang: 'js', meta: 'live=true', value: '<Toggle label="hi" />' })
]);
attacher()(tree);
console.log(tree);
