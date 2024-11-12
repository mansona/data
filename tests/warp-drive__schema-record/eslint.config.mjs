// @ts-check
import { globalIgnores } from '@warp-drive/internal-config/eslint/ignore.js';
import * as gts from '@warp-drive/internal-config/eslint/gts.js';
import * as node from '@warp-drive/internal-config/eslint/node.js';
import * as typescript from '@warp-drive/internal-config/eslint/typescript.js';
import * as qunit from '@warp-drive/internal-config/eslint/qunit.js';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // all ================
  globalIgnores(),

  // browser (js/ts) ================
  typescript.browser({
    enableGlint: true,
    srcDirs: ['app', 'tests'],
    allowedImports: ['@ember/application', '@ember/object', '@ember/owner'],
  }),

  gts.browser({
    srcDirs: ['app', 'tests'],
    allowedImports: ['@ember/application', '@ember/object', '@ember/owner'],
  }),

  // node (module) ================
  node.esm(),

  // node (script) ================
  node.cjs(),

  // Test Support ================
  qunit.ember({
    allowedImports: ['@ember/application', '@ember/object', '@ember/owner', '@glimmer/component'],
  }),
];
