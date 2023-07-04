const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const config = {
  entry: "./src/index.js",
  target: "web",
  devtool: "source-map",
  output: {
    filename: "content.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      },
      {
        test: /\.css$/i,
        include: /\.module\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { modules: true, importLoaders: 1 },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
        exclude: /\.module\.css$/,
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: ["background.js", "manifest.json", "public/*"],
    }),
  ],
};

module.exports = () => {
  config.mode = process.env.NODE_ENV;
  return config;
};
