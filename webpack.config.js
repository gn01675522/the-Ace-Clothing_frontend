const webpack = require("webpack");
const { resolve, join } = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const mode =
  process.env.NODE_ENV === "production" ? "production" : "development";

const config = {
  entry: "./src/index.tsx",
  output: {
    filename: "[name].[contenthash].js",
    path: resolve(__dirname, "build"),
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
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
          },
          {
            test: /\.scss$/,
            use: ["style-loader", "css-loader", "sass-loader"],
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
  devServer: {
    static: [
      { directory: join(__dirname, "build") },
      { directory: join(__dirname, "public") },
    ],
    compress: true,
    port: 3000,
    hot: true,
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    new webpack.DefinePlugin({
      "process.env.APP_API_URL": JSON.stringify(process.env.APP_API_URL || ""),
      "process.env.APP_API_PATH": JSON.stringify(
        process.env.APP_API_PATH || ""
      ),
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: mode === "production" ? "static" : "disabled",
      openAnalyzer: false,
      reportFilename: "bundle-report.html",
    }),
  ],
  optimization: {
    // minimize: mode === "production",
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
  mode: mode,
  devtool: mode === "development" ? "source-map" : false,
};

module.exports = config;
