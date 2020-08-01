// webpack config mode development

const HtmlWebPackPlugin              = require('html-webpack-plugin');
const MiniCssExtraPlugin             = require('mini-css-extract-plugin');
// optimiza espacios, cometarios de los css, siempre y cuando este en prod.
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin                     = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  optimization:{
    minimizer: [ new OptimizeCssAssetsWebpackPlugin() ]
  },
  // configuracion del WebPack
  module:{

    rules:[
      // que hacer con cierto tipo de archivos

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
            minimize: false,
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
      // [name]  misEstilos  <--  estilos.css
      filename: '[name].css',
      ignoreOrder: false
    }),

    new CopyPlugin({
      patterns: [
        // mueve la media assets ak dist/assets
        { from: 'src/assets', to: 'assets/' },
      ],
    }),

  ]

}
