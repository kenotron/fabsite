"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parser = __importStar(require("@babel/parser"));
const traverse_1 = __importDefault(require("@babel/traverse"));
const get_1 = __importDefault(require("lodash/get"));
const fromSpecifiers = (specifiers = []) => Array.isArray(specifiers) && specifiers.length > 0 ? specifiers.map(specifier => get_1.default(specifier, 'local.name')) : [];
const traverseOnImports = (fn) => (code) => {
    try {
        const ast = parser.parse(code, { sourceType: 'module' });
        let populated = [];
        traverse_1.default(ast, {
            enter(path) {
                if (path.isImportDeclaration()) {
                    populated = populated.concat(fn(path));
                    return;
                }
            }
        });
        return populated;
    }
    catch (err) {
        return [];
    }
};
exports.getImportsVariables = traverseOnImports((path) => fromSpecifiers(path.node.specifiers));
