const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { BaseHrefWebpackPlugin } = require('base-href-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const path = require('path')
const merge = require('webpack-merge')
const htmlWebpackPlugin = require('html-webpack-plugin')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const htmlWebpackMultiBuildPlugin = require('html-webpack-multi-build-plugin')

const devMode = process.env.build === 'dev'
const multiBuildMode = process.env.build === 'multi'
const legacyMode = process.env.legacy === 'true'

const template = multiBuildMode
  ? require.resolve('html-webpack-multi-build-plugin/template.ejs')
  : require.resolve('html-webpack-plugin/default_index.ejs')

const base = {
  devServer: {
    historyApiFallback: true,
  },
  mode: 'production',
  // module: {
  //   rules: [
  //     {
  //       test: /\.(ts|js)x?$/,
  //       use: {
  //         loader: 'babel-loader',
  //         options: {
  //           presets: [
  //             [
  //               '@babel/preset-env',
  //               {
  //                 targets: {
  //                   esmodules: true,
  //                 },
  //               },
  //             ],
  //           ],
  //           plugins: ['@babel/plugin-syntax-dynamic-import'],
  //         },
  //       },
  //     },
  //     {
  //       test: /\.tsx?$/,
  //       use: 'ts-loader',
  //     },
  //   ],
  // },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      'images/**',
      'node_modules/@webcomponents/webcomponentsjs/**',
      'manifest.json',
    ]),
    new htmlWebpackPlugin({
      inject: !multiBuildMode,
      chunksSortMode: 'none',
      template,
      // template: 'index.html',
    }),
    new htmlWebpackMultiBuildPlugin(),
    new WorkboxWebpackPlugin.GenerateSW({
      include: ['index.html', 'manifest.json', /\.js$/],
      exclude: [/\/@webcomponents\/webcomponentsjs\//],
      navigateFallback: 'index.html',
      swDest: 'service-worker.js',
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: /\/@webcomponents\/webcomponentsjs\//,
          handler: 'staleWhileRevalidate',
        },
        {
          urlPattern: /^https:\/\/fonts.gstatic.com\//,
          handler: 'staleWhileRevalidate',
        },
        {
          urlPattern: new RegExp('^https://conduit.productionready.io/'),
          handler: 'networkFirst',
        },
      ],
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false, // Must be set to true if using source-maps in production
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        },
        extractComments: {
          condition: /^\**!|@preserve|@license|@cc_on/i,
          filename: 'extracted-comments.js',
          banner: licenseFile => {
            return `License information can be found in ${licenseFile}`
          },
        },
      }),
    ],
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[contenthash].js',
  },
}

module.exports = base
