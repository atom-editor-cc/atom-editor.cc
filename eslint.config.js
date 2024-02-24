module.exports = (async () => {
  const { default: config } = await import("@jgarber/eslint-config");

  return [
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
})();
