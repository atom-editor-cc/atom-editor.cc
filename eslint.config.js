import config from "@jgarber/eslint-config";

export default [
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
