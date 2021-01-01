const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'previewer-react.js',
    library: 'PosPrintPreviewerReact',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  externals: {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
    },
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      // {
      //   enforce: 'pre',
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   loader: 'eslint-loader',
      // },
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-react',
                {
                  modules: false,
                  targets: {
                    browsers: ['ios >= 4', 'android >=4', 'ie >=11'],
                  },
                },
              ],
            ],
            plugins: [
              [
                require('@babel/plugin-proposal-class-properties'),
                { loose: true },
              ],
            ],
          },
        },
      },
    ],
  },
  devtool: 'source-map',
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
          compress: {
            drop_console: true,
          },
        },
        extractComments: false,
      }),
    ],
  },
};
