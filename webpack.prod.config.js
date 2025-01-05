const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const prodConfig = {
  mode: "production",
  devtool: false,
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, "css-loader"],
          },
          {
            test: /\.scss$/,
            use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:10].css",
    }),
  ],
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
    },
  },
};

module.exports = { prodConfig };
