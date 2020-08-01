// webpack config mode production

const HtmlWebPackPlugin              = require('html-webpack-plugin');
const MiniCssExtraPlugin             = require('mini-css-extract-plugin');
// optimiza espacios, cometarios de los css, siempre y cuando este en prod.
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin                     = require('copy-webpack-plugin');
// babel minify js
const MinifyPlugin                   = require('babel-minify-webpack-plugin');
// delete dist folder, desetructuracion de paquetes.
const { CleanWebpackPlugin } = require('clean-webpack-plugin');




module.exports = {
  mode: 'production',
  optimization:{
    minimizer: [ new OptimizeCssAssetsWebpackPlugin() ]
  },

  output:{
    // contentHash es para el cacheo de los archivos en los PC's del cliente.
    // cacheo: que no refresca, por ende no visualiza nuevos cambios
    filename: 'main.[contentHash].js'
  },
  // configuracion del WebPack
  module:{

    rules:[
      // que hacer con cierto tipo de archivos

      // babel for js production
      {
        test: /\.js$/,
        exclude: /node_modules/,
        //loader: "babel-loader"
        use:[
          'babel-loader'
        ]
      },

      /*
        en este caso queremos que cuando se haga el build, mueva el index
        a la carpeta de distribución y que además relaciones el main.js en ese index

        pack1: permite mover el archivo de lugar, pack2: permite incrustar un archivo en otro.
      */
      {
          test:/\.html$/i,
          loader: 'html-loader',
          options: {
            attributes: false,
            // quitar espacios , cometarios del html, OPTIMIZER
            minimize: true,
          },
      },

      // reglas css por componente.
      {
        test: /\.css$/,
        exclude: /estilos\.css$/,
        use:[
          'style-loader',
          'css-loader'
        ]
      },
      // reglas css global
      {
        test: /estilos\.css$/,
        use:[
          MiniCssExtraPlugin.loader,
          'css-loader'
        ]
      },
      // reglas imagenes
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false
            }
          }
        ]
      },

    ]
  },
  plugins:[
    new HtmlWebPackPlugin({
      // que archivo es el que quiero tomar
      template: './src/index.html',
      // index to dist/
      filename: './index.html'
    }),

    new MiniCssExtraPlugin({
      // [name]  misEstilos  <--  estilos.css (global)
      filename: '[estilos].[contentHash].css',
      ignoreOrder: false
    }),

    new CopyPlugin({
      patterns: [
        // mueve la media assets ak dist/assets
        { from: 'src/assets', to: 'assets/' },
      ],
    }),

    new MinifyPlugin(),

    new CleanWebpackPlugin(),
  ]

}
