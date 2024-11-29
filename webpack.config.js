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
      // {
      //   test: /\.svg$/i,
      //   oneOf: [
      //     {
      //       // 當 SVG 作為 React 組件導入時
      //       issuer: /\.[jt]sx?$/,
      //       use: [
      //         {
      //           loader: "@svgr/webpack",
      //           options: {
      //             svgo: true, // 啟用 SVGO
      //             svgoConfig: {
      //               plugins: [
      //                 {
      //                   name: "preset-default",
      //                   params: {
      //                     overrides: {
      //                       removeViewBox: false, // 保留 viewBox
      //                       removeXMLNS: false, // 保留 xmlns
      //                       removeDimensions: false, // 保留 width 和 height
      //                     },
      //                   },
      //                 },
      //               ],
      //             },
      //           },
      //         },
      //       ],
      //     },
      //     {
      //       type: "asset/resource",
      //       generator: {
      //         filename: "images/[hash][ext][query]",
      //       },
      //     },
      //   ],
      // },
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
    new webpack.DefinePlugin(envKeys),
  ],
  mode: "development",
  devtool: "source-map",
};
