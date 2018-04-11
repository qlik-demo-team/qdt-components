const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'qdt-components.js',
    library: 'QdtComponents',
    libraryTarget: 'umd',
    libraryExport: 'default',
  },
  module: {
    loaders: [
      {
        include: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['latest', 'react'],
          plugins: ['transform-decorators-legacy', 'transform-object-rest-spread', 'transform-class-properties', 'transform-runtime'],
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'eslint-loader',
        options: {
          fix: true
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [{
          loader: 'style-loader', // inject CSS to page
        }, {
          loader: 'css-loader', // translates CSS into CommonJS modules
        }, {
          loader: 'postcss-loader', // Run post css actions
          options: {
            plugins() { // post css plugins, can be exported to postcss.config.js
              return [
                require('precss'),
                require('autoprefixer'),
              ];
            },
          },
        }, {
          loader: 'sass-loader', // compiles SASS to CSS
        }],
      },    
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
        },  
      },      
      {
          test: /\.json$/,
          loader: 'json-loader'
      },
      //   {
      //     test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      //     use: [
      //       {
      //         loader: 'url-loader',
      //         options: {
      //           limit: 10000,
      //           mimetype: 'application/font-woff',
      //           publicPath: "."
      //         }
      //       }
      //     ]
      //   },
      //     {
      //       test: /\.(ttf|eot|woff|woff2|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      //       use: [
      //         { loader: 'file-loader' }
      //       ]
      //     },    
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
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
};
