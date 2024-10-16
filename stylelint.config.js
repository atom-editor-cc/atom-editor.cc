export default {
  extends: "@jgarber/stylelint-config-scss",
  rules: {
    "font-family-no-missing-generic-family-keyword": [
      true,
      {
        ignoreFontFamilies: ["octicons"],
      },
    ],
    "no-descending-specificity": null,
  },
};
