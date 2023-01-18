const LodashPlugin = require("lodash-webpack-plugin");
module.exports = {
  webpack: {
    plugins: {
      add: [new LodashPlugin()],
    },
  },
  babel: {
    plugins: ["lodash"],
  },
};
