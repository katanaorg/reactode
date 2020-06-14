/* eslint-disable no-console */
process.env.NODE_ENV = 'development';
process.env.PUBLIC_URL = process.env.PUBLIC_URL || '';

require('@babel/register')({
  plugins: [
    [
      'css-modules-transform',
      {
        camelCase: true,
        extensions: ['.css', '.scss'],
        generateScopedName: '[hash:base64]',
      }
    ],
    'dynamic-import-node'
  ]
});

const webpack = require('webpack');
const express = require('express');
const { applyDevMiddleware } = require('./utils/devMiddleware');
const { config } = require('./webpackConfig/dev.js');


process.on('unhandledRejection', err => {
  throw err;
});

// BUILD
// const clientConfig = config.client;
// const serverConfig = config.server;
// const clientCompiler = webpack(clientConfig);
// const serverCompiler = webpack(serverConfig);

// clientCompiler.run((err, stats)  => {
//   if (err) {
//     console.log('Client has errors', err);
//     return err;
//   } else {
//     console.log('✓ Client webpack build complete');
//     console.log(
//       '[webpack]',
//       stats.toString({
//         assetsSort: 'chunkNames',
//         chunks: false,
//         colors: true,
//         errorDetails: true,
//         excludeAssets: /\.(png|map)$/,
//         modules: false,
//         warnings: true
//       })
//     );
//   }
// });

// serverCompiler.run((err, stats) => {
//   if (err) {
//     console.log('Server has errors', err);
//     return err;
//   } else {
//     console.log('✓ Server webpack build complete');
//     console.log(
//       '[webpack]',
//       stats.toString({
//         assetsSort: 'chunkNames',
//         chunks: false,
//         colors: true,
//         errorDetails: true,
//         excludeAssets: /\.(png|map)$/,
//         modules: false,
//         warnings: true
//       })
//     );
//   }
// });

// SERVER
const DEFAULT_PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || '0.0.0.0';
const server = express();
applyDevMiddleware(config, server);

server.use((req, res) => {
  const { app } = require('../server');
  app(req, res);
});

server.listen(DEFAULT_PORT, HOST, err => {
  if (err) {
    return console.log(err);
  }
  console.log('\n\tStarting dev server...');
  console.log(
    `
      Running locally at ${HOST}:${DEFAULT_PORT}
    `
  );
});
