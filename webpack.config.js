const path = require('path');
const webpack = require('webpack');
const DirectoryNamedWebpackPlugin = require("directory-named-webpack-plugin");
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
        test: /\.(ts|tsx|js|jsx|map)$/,
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
          // "sass-loader" // compiles Sass to CSS, using Node Sass by default
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
    alias: {
      components: path.resolve(__dirname, 'src/components/'),
      hooks: path.resolve(__dirname, 'src/hooks/'),
      themes: path.resolve(__dirname, 'src/themes/'),
      utils: path.resolve(__dirname, 'src/utils/'),
    },
    plugins: [
      new DirectoryNamedWebpackPlugin({ exclude: /node_modules/ }),
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        include: /\.min\.js$/,
        cache: true,
        parallel: true,
        uglifyOptions: {
          warnings: true,
          parse: {},
          compress: false,
          mangle: false, // Note `mangle.properties` is `false` by default.
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