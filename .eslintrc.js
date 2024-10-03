module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["prettier", "react-native"],
  rules: {
    "prettier/prettier": ["error", { trailingComma: "all" }],
    "react-native/no-unused-styles": "error",
  },
};
