var webpack = require('webpack');
var merge = require('lodash/object/merge');
var args = global.PROJECT_ARGS;

var plugins = []

var baseConfig = {
  entry: {},
  module: {
    loaders: [
      { test: /\.json5?$/, loader: "json5" },
      { test: /\.js$/, exclude: /node_modules\/(?!oro-xhr)/, loader: 'babel-loader'}
    ]
  },
  plugins: plugins
};

function bundle(opts) {
  return merge({}, baseConfig, opts);
}

var clientPlugins = [];

if (args.production) {
  clientPlugins.push(
    new webpack.optimize.UglifyJsPlugin()
  )
}

var clientBundle = bundle({
  entry: { client: './client/bootloader' },
  output: {
    path: './assets/js',
    filename: '[name].js'
  },
  devtool: 'source-map',
  externals: {
    'react-router': 'ReactRouter',
    'react': 'React'
  },
  plugins: clientPlugins
});

var serverBundle = bundle({
  entry: { server: './server/app' },
  output: {
    path: './bin',
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  node: {
    console: false,
    process: false,
    global: true,
    Buffer: false,
    __filename: false,
    __dirname: false
  },
  externals: {
    fs: true,
    net: true,
    express: true,
    superagent: true,
    jade: true,
    cheerio: true,
    crypto: true,
    'body-parser': true
  }
});

module.exports = [clientBundle, serverBundle];