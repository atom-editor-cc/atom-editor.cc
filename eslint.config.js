import config from "@jgarber/eslint-config";

export default [
  { ignores: ["_site"] },
  ...config,
  {
    files: ["src/assets/javascripts/*.js"],
    languageOptions: {
      globals: {
        document: "readonly",
      },
    },
  },
];
