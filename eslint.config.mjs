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
            // Types
            { pattern: "@/types/api/**", group: "type", position: "after" },
            { pattern: "@/types/core/**", group: "type", position: "after" },
            {
              pattern: "@/types/modules/**",
              group: "type",
              position: "after",
            },

            // Lib
            { pattern: "@/lib/db", group: "internal", position: "before" },
            { pattern: "@/lib/http/**", group: "internal", position: "before" },
            { pattern: "@/lib/core/**", group: "internal", position: "before" },
            {
              pattern: "@/lib/middlewares/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/lib/utils/**",
              group: "internal",
              position: "before",
            },

            // Server
            {
              pattern: "@/server/models/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/server/services/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/server/controllers/**",
              group: "internal",
              position: "before",
            },

            // Client
            {
              pattern: "@/client/contexts/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/client/hooks/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/client/components/**",
              group: "internal",
              position: "before",
            },

            // App
            {
              pattern: "@/app/**/components/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/app/**/views/**",
              group: "internal",
              position: "before",
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
