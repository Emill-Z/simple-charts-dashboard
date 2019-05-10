'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  entry: {
    admin: [
      './admin/app/app.module.js'
    ],
  },
  output: {
    path: path.resolve(__dirname, '.dist'),
    filename: '[name].[hash].js',
    publicPath: NODE_ENV === 'development' ? __dirname + '/assets' : undefined
  },
  watch: NODE_ENV !== 'production',
  devtool: NODE_ENV === 'development' ? 'eval' : false,
  devServer: {
    open: true,
    stats: {
      warnings: false
    }
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        use: [
          { loader: 'ng-annotate-loader' },
          { loader: 'babel-loader' }
        ]
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.(png|jpg|mp4|ovg|webm|svg|ttf|eot|woff|woff2)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          query: {
            name: '[path][name].[ext]',
            limit: '100000'
          }
        }]
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'admin/dev.html'),
      filename: path.resolve(__dirname, 'index.html'),
      inject: 'body',
      alwaysWriteToDisk: true,
      chunks: ['admin'],
      // inlineHeaders: NODE_ENV === 'production' ? getInlineHtml('admin') : '',
    }),
    new HtmlWebpackHarddiskPlugin()
  ]
};

if (NODE_ENV === 'production') {
  module.exports.module.rules.push({
    test: /\.scss/,
    loader: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [{
        loader: 'css-loader',
        options: {
          sourceMap: NODE_ENV !== 'production'
        }
      }, {
        loader: 'sass-loader',
        options: {
          sourceMap: NODE_ENV !== 'production'
        }
      }]
    })
  });
  module.exports.module.rules.push({
    test: /\.css/,
    loader: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [{
        loader: 'css-loader',
        options: {
          sourceMap: NODE_ENV !== 'production'
        }
      }]
    })
  });
  module.exports.plugins.unshift(
    new ExtractTextPlugin('[name].[hash].css')
  );
  module.exports.plugins.push(
    new UglifyJSPlugin({sourceMap: true})
  );
} else {
  module.exports.module.rules.push({
    test: /\.css/,
    use: [{
      loader: 'style-loader'
    }, {
      loader: 'css-loader',
      options: {
        sourceMap: true
      }
    }]
  });
  module.exports.module.rules.push({
    test: /\.scss/,
    use: [{
      loader: 'style-loader'
    }, {
      loader: 'css-loader',
      options: {
        sourceMap: true
      }
    }, {
      loader: 'sass-loader',
      options: {
        sourceMap: true
      }
    }]
  });
}
