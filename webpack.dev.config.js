const { join } = require("path");

const devConfig = {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    static: [
      { directory: join(__dirname, "build") },
      { directory: join(__dirname, "public") },
    ],
    compress: true,
    port: 3000,
    host: "localhost",
    hot: true,
    open: true,
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
          },
          {
            test: /\.scss$/,
            use: ["style-loader", "css-loader", "sass-loader"],
          },
        ],
      },
    ],
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
    },
  },
};

module.exports = { devConfig };
