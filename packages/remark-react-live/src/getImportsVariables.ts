import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import get from 'lodash/get';

const fromSpecifiers = (specifiers: any = []) =>
  Array.isArray(specifiers) && specifiers.length > 0 ? specifiers.map(specifier => get(specifier, 'local.name')) : [];

const traverseOnImports = (fn: (path: any) => any[]) => (code: string) => {
  try {
    const ast = parser.parse(code, { sourceType: 'module' });
    let populated: any[] = [];

    traverse(ast, {
      enter(path: any): void {
        if (path.isImportDeclaration()) {
          populated = populated.concat(fn(path));
          return;
        }
      }
    });

    return populated;
  } catch (err) {
    return [];
  }
};

export const getImportsVariables = traverseOnImports((path: any) => fromSpecifiers(path.node.specifiers));
