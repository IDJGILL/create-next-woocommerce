/** @typedef {import("prettier").Config} PrettierConfig */
/** @typedef {import("prettier-plugin-tailwindcss").PluginOptions} TailwindConfig */
/** @typedef {import("@trivago/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig */

/** @type { PrettierConfig | SortImportsConfig | TailwindConfig } */
const config = {
  plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],

  printWidth: 140,

  semi: false,

  bracketSpacing: true,

  singleQuote: true,

  proseWrap: 'always',

  tailwindFunctions: ['cn', 'cva'],

  importOrder: ['server-only', '.css', '^./(.*)$', '<THIRD_PARTY_MODULES>'],

  importOrderSeparation: true,

  importOrderSortSpecifiers: true,

  tabWidth: 2,

  trailingComma: 'es5',

  arrowParens: 'always',

  importOrderParserPlugins: ['typescript', 'jsx'],
}

export default config
