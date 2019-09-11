import Module from 'module';
import fs from 'fs';

type ParentType = {
  children: Array<any>;
  exports: any;
  filename: string;
  id: string;
  loaded: boolean;
  parent: any;
  paths: Array<string>;
};

const originalLoad = (Module as any)._load;

(global as any).window = {
  location: {
    hostname: ''
  },

  navigator: {
    userAgent: ''
  }
};

export default () => {
  (Module as any)._load = function(request: string, parent: ParentType) {
    const rawLoaders = ['!@uifabric/codepen-loader!', '!raw-loader!'];

    for (const loader of rawLoaders) {
      if (request.includes(loader)) {
        const fileRequest = require.resolve(request.replace(loader, ''));
        const fileContent = fs.readFileSync(fileRequest, 'utf-8');

        const json = JSON.stringify(fileContent)
          .replace(/\u2028/g, '\\u2028')
          .replace(/\u2029/g, '\\u2029');

        return { default: json };
      }
    }

    // eslint-disable-next-line prefer-rest-params
    return originalLoad.apply(this, arguments);
  };

  return () => {
    (Module as any)._load = originalLoad;
  };
};
