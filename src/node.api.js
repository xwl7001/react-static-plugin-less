import ExtractCssChunks from 'extract-css-chunks-webpack-plugin'
import semver from 'semver'

export default ({ includePaths = [], ...rest }) => ({
  webpack: (config, { stage }) => {
    let loaders = []

    const lessLoaderPath = require.resolve('less-loader')

    const lessLoader = {
        // loader: 'less-loader',
        loader: lessLoaderPath,
        options: {
        sourceMap: true,
        // modifyVars: themeVariables,
        javascriptEnabled: true,
      },
    }
    const styleLoader = { loader: 'style-loader' }
    const cssLoader = {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        sourceMap: false,
      },
    }

    if (stage === 'dev') {
      // Dev
      loaders = [styleLoader, cssLoader, lessLoader]
    } else if (stage === 'node') {
      // Node
      // Don't extract css to file during node build process
      loaders = [cssLoader, lessLoader]
    } else {
      // Prod

      // // for legacy css-loader version (<2.0) we need to add "minimize" to minify css code
      // // for >2.0 it is handled with https://github.com/NMFR/optimize-css-assets-webpack-plugin
      // const cssLoaderVersion = require('css-loader/package.json').version
      // if (semver.satisfies(cssLoaderVersion, '<2') === true) {
      //   cssLoader.options.minimize = true
      // }

      loaders = [ExtractCssChunks.loader, cssLoader, lessLoader]
    }

    config.module.rules[0].oneOf.unshift({
      test: /\.less$/,
      use: loaders,
    })

    return config
  },
})
