const { resolve, join } = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");

const { merge } = require("webpack-merge");

const baseConfig = {
  entry: "./src/index.tsx",
  output: {
    filename: "js/[name].[contenthash:10].js",
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
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
};

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
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
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
