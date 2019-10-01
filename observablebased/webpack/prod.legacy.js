const base = require('./base'),
  merge = require('webpack-merge'),
  WebpackModuleNomodulePlugin = require('webpack-module-nomodule-plugin')

const legacyConfig = {
  name: 'ProdLegacyConfig',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: { ie: '11' } }]],
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

module.exports = merge(base, legacyConfig)
