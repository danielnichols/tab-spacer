const LodashPlugin = require("lodash-webpack-plugin");
module.exports = {
  webpack: {
    alias: {
      react: "preact/compat",
      "react-dom/test-utils": "preact/test-utils",
      "react-dom": "preact/compat", // Must be below test-utils
      "react/jsx-runtime": "preact/jsx-runtime",
    },
    plugins: {
      add: [new LodashPlugin()],
    },
  },
  babel: {
    plugins: ["lodash"],
  },
};
