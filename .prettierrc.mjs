/** @type {import("prettier").Config} */
export default {
  semi: false,
  singleQuote: false,
  trailingComma: "all",
  endOfLine: "lf",
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
}
