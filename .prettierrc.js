/* eslint-env node */
module.exports = {
  // Change your rules accordingly to your coding style preferencies.
  // https://prettier.io/docs/en/options.html
  semi: true,
  trailingComma: "es5",
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  endOfLine: "auto",
  plugins: ["@trivago/prettier-plugin-sort-imports"],
  importOrder: [
    "^react$",
    "<THIRD_PARTY_MODULES>",
    "^(context|constants|hooks|services|utilities|types)/(.*)$|^types$",
    "^(features)/(.*)/(contexts|types|constants|hooks|utilities)/(.*)$",
    "^(blocks|components|modules)/(.*)$",
    "^(features)/(.*)/(components|blocks|modules)/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  singleQuote: false,
  quoteProps: "consistent",
};
