const base = require('./base'),
  merge = require('webpack-merge'),
  prodMode = process.env.build === 'prod',
  WebpackModuleNomodulePlugin = require('webpack-module-nomodule-plugin')

const prodConfig = {
  name: 'ProdConfig',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    esmodules: true,
                  },
                },
              ],
            ],
            plugins: ['@babel/plugin-syntax-dynamic-import'],
          },
        },
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
    ],
  },
}

module.exports = merge(base, prodConfig)
