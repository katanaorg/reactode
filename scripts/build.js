/* eslint-disable no-console */
process.env.NODE_ENV = 'production';
process.env.PUBLIC_URL = process.env.PUBLIC_URL || '';

const path = require('path');
const webpack = require('webpack');
const fs = require('fs-extra');
const { config } = require('./webpackConfig/prod.js');


process.on('unhandledRejection', err => {
  throw err;
});

// BUILD
const clientConfig = config.client;
const serverConfig = config.server;

fs.emptyDirSync(path.resolve(__dirname, '../build'));
build().then(result => printResult(result));

function build() {
  const clientCompiler = webpack(clientConfig);
  const serverCompiler = webpack(serverConfig);
  
  return new Promise((resolve, reject) => {
    clientCompiler.run((err, clientStats)  => {
      if (err) {
        return reject(err);
      } else {
        console.log('✓ Client webpack build complete');
      }

      serverCompiler.run((err, serverStats) => {
        if (err) {
          console.log('Server has errors', err);
          return reject(err);
        } else {
          console.log('✓ Server webpack build complete');
        }

        resolve({
          clientStats,
          serverStats,
        });
      });
    });
  })
}

function printResult({ clientStats, serverStats }) {
  console.log('Client webpack stats'); 
  console.log(
    '[webpack]',
    clientStats.toString({
      assetsSort: 'chunkNames',
      chunks: false,
      colors: true,
      errorDetails: true,
      excludeAssets: /\.(png|map)$/,
      modules: false,
      children: false,
      warnings: true
    })
  );

  console.log('Server webpack stats'); 
  console.log(
    '[webpack]',
    serverStats.toString({
      assetsSort: 'chunkNames',
      chunks: false,
      colors: true,
      errorDetails: true,
      excludeAssets: /\.(png|map)$/,
      modules: false,
      warnings: true
    })
  );
}