const { resolve } = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const { merge } = require("webpack-merge");

const { devConfig } = require("./webpack.dev.config");
const { prodConfig } = require("./webpack.prod.config");

const baseConfig = {
  entry: "./src/index.tsx",
  output: {
    filename: "js/[name].[contenthash:10].js",
    path: resolve(__dirname, "build"),
    clean: true,
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(js|jsx|ts|tsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: [
                  "@babel/preset-env",
                  ["@babel/preset-react", { runtime: "automatic" }],
                  "@babel/preset-typescript",
                ],
              },
            },
          },
          {
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ["@svgr/webpack"],
          },
          {
            test: /\.(png|jpe?g|gif|bmp|ico)$/i,
            type: "asset/resource",
            generator: {
              filename: "images/[hash][ext][query]",
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    new Dotenv({
      path: "./.env",
      systemvars: true,
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "disabled",
      openAnalyzer: false,
      reportFilename: "bundle-report.html",
    }),
  ],
};

module.exports = (env, args) => {
  switch (args.mode) {
    case "development":
      return merge(baseConfig, devConfig);
    case "production":
      return merge(baseConfig, prodConfig);
    default:
      throw new Error("No matching configuration was found!");
  }
};
