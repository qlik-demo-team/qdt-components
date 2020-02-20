const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {
    "qdt-components": "./src/index",
    "qdt-components.min": "./src/index",
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: "[name].js",
    // `chunkFilename` provides a template for naming code-split bundles (optional)
    chunkFilename: '[name].bundle.js',
    library: 'QdtComponents',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'eslint-loader',
            options: {
              fix: true,
            },
          },
        ],
      },
      {
        test: /\.(scss|css)$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ],
      },    
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
        },  
      }, 
    ],
  },
  plugins: [
    function() {
        this.plugin('watch-run', function(watching, callback) {
            let date = new Date();
            let displayDate = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            console.log('\x1b[36m%s\x1b[0m', `----------------------------`);
            console.log('\x1b[36m%s\x1b[0m', `Start compiling at ${displayDate}`);  //cyan
            console.log('\x1b[36m%s\x1b[0m', `----------------------------`);
            callback();
        })
    },
    new webpack.ProvidePlugin({
      "Hammer": "hammerjs/hammer"
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    // Conflict with libraries like qdt-lui that use the same version of React
    // alias: {
    //   'react': path.join(__dirname, './node_modules/react'),
    //   'react-dom': path.join(__dirname, '/node_modules/react-dom'),
    // }
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        include: /\.min\.js$/,
        uglifyOptions: {
          warnings: true,
          parse: {},
          compress: false,
          mangle: true, // Note `mangle.properties` is `false` by default.
          output: null,
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_fnames: false,
        },
      }),
    ],
  },
};
