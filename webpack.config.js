const webpack = require("webpack");
const { resolve, join } = require("path");
const dotenv = require("dotenv");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const env = dotenv.config().parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "main.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
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
    }),
    new webpack.DefinePlugin({
      "process.env.APP_API_URL": JSON.stringify(process.env.APP_API_URL || ""),
      "process.env.APP_API_PATH": JSON.stringify(
        process.env.APP_API_PATH || ""
      ),
    }),
  ],
  mode: "development",
  devtool: process.env.NODE_ENV === "development" ? "source-map" : false,
};
