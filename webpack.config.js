const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
   mode: 'development',
   experiments: {
       asyncWebAssembly: true,
   },
   entry: {
       index: './src/index.js',
   },
   module: {
       rules: [
           {
               test: /\.css$/i,
               use: ['style-loader', 'css-loader'],
           },
       ],
   },
   devServer: {
       static: {
           directory: path.join(__dirname, 'dist'),
       },
       host: '0.0.0.0',
       server: 'https',
       compress: true,
       port: 3000,
       allowedHosts: ['192.168.87.149', '192.168.80.01', 'localhost'],
       client: {
           overlay: { warnings: false, errors: true },
       },
   },    
   output: {
       filename: '[name].bundle.js',
       path: path.resolve(__dirname, 'dist'),
       publicPath: './',
       clean: true,
   },
   plugins: [
       new ESLintPlugin({
           extensions: ['js']
       }),
       new HtmlWebpackPlugin({
           template: './src/index.html',
       }),
       new CopyPlugin({
           patterns: [
               { from: 'src/assets', to: 'assets' },
               {
                   from: 'node_modules/three/examples/jsm/libs/basis',
                   to: 'vendor/basis',
               },
               {
                   from: 'node_modules/three/examples/jsm/libs/draco',
                   to: 'vendor/draco',
               },
           ],
       }),
   ],
   devtool: 'source-map',
};