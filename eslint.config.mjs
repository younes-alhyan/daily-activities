import tsPlugin from "@typescript-eslint/eslint-plugin";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "lib/shadcn/**",
    "client/components/ui/**",
  ]),
  {
    plugins: tsPlugin,
    rules: {
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          prefer: "type-imports",
          disallowTypeAnnotations: true,
        },
      ],
    },
  },
  {
    rules: {
      "import/order": [
        "warn",
        {
          groups: ["external", "internal", "type", "unknown"],
          pathGroups: [
            // Lib
            { pattern: "@/lib/db", group: "internal", position: "before" },
            { pattern: "@/lib/http/*", group: "internal", position: "before" },
            {
              pattern: "@/lib/middlewares/*",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/lib/utils/*",
              group: "internal",
              position: "before",
            },

            // Models
            {
              pattern: "@/modules/models/*",
              group: "internal",
              position: "before",
            },

            // Features
            {
              pattern: "@/features/*",
              group: "internal",
              position: "before",
            },

            // Api
            {
              pattern: "@/app/api/**/services",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/app/api/**/controllers",
              group: "internal",
              position: "before",
            },

            // Contexts
            {
              pattern: "@/client/contexts/*",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/app/**/contexts/*",
              group: "internal",
              position: "before",
            },

            // Hooks
            {
              pattern: "@/client/hooks/*",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/app/**/hooks/*",
              group: "internal",
              position: "before",
            },

            // Views
            {
              pattern: "@/client/views/*",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/app/**/views/*",
              group: "internal",
              position: "before",
            },

            // Components
            {
              pattern: "@/client/components/*",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/app/**/components/*",
              group: "internal",
              position: "before",
            },

            // Types
            {
              pattern: "@/types/helpers.types",
              group: "type",
              position: "after",
            },
            {
              pattern: "@/types/api.types",
              group: "type",
              position: "after",
            },
            {
              pattern: "@/types/core.types",
              group: "type",
              position: "after",
            },
            {
              pattern: "@/modules/types/*",
              group: "type",
              position: "after",
            },
            {
              pattern: "@/features/*/types",
              group: "type",
              position: "after",
            },

            // Styles
            { pattern: "*.css", group: "unknown", position: "before" },
          ],
          // pathGroupsExcludedImportTypes: ["builtin", "external", "type"],
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
    },
  },
]);

export default eslintConfig;
