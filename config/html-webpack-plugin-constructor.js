var path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function createHtmlWebpackPlugin(options) {
  if (!options) {
    throw new Error('options must be specified.');
  }

  const configurationRootDir = options.configurationRootDir;
  const searchRootDir = options.searchRootDir;
  const metadata = options.metadata;
  const chunksSortMode = options.chunksSortMode || 'dependency';
  const inject = options.inject || 'body';
  const baseScripts = options.baseScripts || [];
  const templateOverrides = options.templateOverrides || [];
  const htmlExtension = '.html';
  let htmlFiles = [];

  if (!searchRootDir) {
    throw new Error('searchRootDir must be specified.');
  }

  dfs(searchRootDir, '.');

  function dfs(base, fileName) {
    let node = path.join(base, fileName);
    let stat = fs.statSync(node);
    if (stat.isDirectory()) {
      fs.readdirSync(node).forEach(file => dfs(node, file));
    } else if (path.extname(fileName) === htmlExtension) {
      htmlFiles.push({
        fileName: fileName,
        template: path.relative(configurationRootDir, path.join(base, fileName))
      });
    }
  }

  let configurations = htmlFiles.map((htmlFile) => {
    let chunks = baseScripts && baseScripts.length > 0 ? baseScripts.slice() : [];
    const file = path.parse(htmlFile.fileName);
    const templateOverride = templateOverrides.find(item => item.fileName === file.name || item.fileName === htmlFile.fileName);
    if (templateOverride && templateOverride.chunks && templateOverride.chunks.length > 0) {
      chunks = templateOverride.chunks.slice();
    } else {
      chunks.push(file.name);
    }

    /* Plugin: HtmlWebpackPlugin
    * Description: Simplifies creation of HTML files to serve your webpack bundles.
    * This is especially useful for webpack bundles that include a hash in the filename
    * which changes every compilation.
    *
    * See: https://github.com/ampedandwired/html-webpack-plugin
    */
    return new HtmlWebpackPlugin({
      filename: templateOverride && templateOverride.filename ? templateOverride.filename : htmlFile.fileName,
      template: htmlFile.template,
      title: metadata && metadata.title ? metadata.title : 'Title',
      chunksSortMode: templateOverride && templateOverride.chunkSortMode ? templateOverride.chunkSortMode : chunksSortMode,
      metadata: templateOverride && templateOverride.metadata ? templateOverride.metadata : metadata,
      inject: templateOverride && templateOverride.inject ? templateOverride.inject : inject,
      chunks: templateOverride && templateOverride.chunks ? templateOverride.chunks : chunks
    });
  });

  return configurations;
}

exports.createHtmlWebpackPlugin = createHtmlWebpackPlugin;