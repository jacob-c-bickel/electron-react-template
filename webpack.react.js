const path = require("path");
// const CopyWebpackPlugin = require("copy-webpack-plugin");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CspHtmlWebpackPlugin = require("csp-html-webpack-plugin");

const isDev = (process.env.NODE_ENV === "development");

const reactConfiguration = {
  mode: isDev ? "development" : "production",
  entry: "./src/index.tsx",
  target: "web",
  devtool: isDev ? "source-map" : false,
  resolve: {
    alias: {
      ["@"]: path.resolve(__dirname, "src")
    },
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [{
      test: /\.tsx?$/i,
      include: /src/,
      use: [{ loader: "ts-loader" }]
    },
    {
      test: /\.s(c|a)ss$/i,
      include: /src/,
      use: [
        isDev ? "style-loader" : MiniCssExtractPlugin.loader, // 3. CSS to style tag (dev) or CSS file (prod)
        "css-loader", // 2. CSS to JS
        "sass-loader" // 1. SASS to CSS
      ]
    }]
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index.js"
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "src/index.html" })
  ].concat(isDev ? [] : [
    new MiniCssExtractPlugin(),
    new CspHtmlWebpackPlugin({
      "default-src": "'self'",
      "script-src": "'self'",
      "style-src": "'self'"
    }, {
      "nonceEnabled": {
        "script-src": false,
        "style-src": false
      }
    })
  ])
};

module.exports = [
  reactConfiguration
];