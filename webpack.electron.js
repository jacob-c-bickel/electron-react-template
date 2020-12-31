const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const isDev = (process.env.NODE_ENV === "development");

const electronConfiguration = {
  mode: isDev ? "development" : "production",
  entry: "./src/main.ts",
  target: "electron-main",
  devtool: isDev ? "source-map" : false,
  resolve: {
    alias: {
      ["@"]: path.resolve(__dirname, "src")
    },
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [{
      test: /\.ts$/i,
      include: /src/,
      use: [{ loader: "ts-loader" }]
    }]
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "main.js",
    // publicPath: path.resolve(__dirname, "dist/public")
  },
  externals: {
    'better-sqlite3': 'commonjs better-sqlite3'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { 
          from: './node_modules/better-sqlite3/build',
          to: './node_modules/better-sqlite3/build'
        },
        {
          from: './node_modules/better-sqlite3/lib',
          to: './node_modules/better-sqlite3/lib'
        },
        {
          from: './node_modules/better-sqlite3/package.json',
          to: './node_modules/better-sqlite3/package.json'
        }
      ]
    })
  ]
};

module.exports = [
  electronConfiguration
];