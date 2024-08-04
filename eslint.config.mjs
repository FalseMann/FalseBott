import unjs from "eslint-config-unjs";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default [
  { ignores: ["**/build/"] },
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
  ...unjs(),
];
