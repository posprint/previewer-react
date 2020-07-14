const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const plugins = [];

if (process.env.NODE_ANALYZE) {
  plugins.push(new BundleAnalyzerPlugin());
}

module.exports = {
  mode: 'production',
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, 'lib'),
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
        test: /\.js$/,
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
  plugins,
  devtool: 'source-map',
  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
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
