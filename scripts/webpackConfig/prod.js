const path = require('path');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const nodeExternals = require('webpack-node-externals');

const config = {
    client: {
        mode: 'production',
        devtool: 'source-map',
        entry: path.resolve(__dirname, '../../src/index.js'),
        output: {
            path: path.resolve(__dirname, '../../build'),
            filename: 'js/[name].[chunkhash:8].js',
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/, 
                    loader: 'babel-loader',
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                localsConvention: 'camelCase',
                                modules: true
                            }
                        },
                        'sass-loader'
                    ]
                },
                {
                    test: /\.(png|jp(e*)g|svg|gif)$/,
                    use: [
                        {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[contentHash:8].[ext]',
                        },
                        },
                    ],
                }              
            ]
        },
        optimization: {
          minimizer: [
            new TerserJSPlugin({}), 
            new OptimizeCSSAssetsPlugin({})],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contentHash:8].css'
              }),
            new ManifestPlugin({
              fileName: 'asset-manifest.json'
            }),
        ],
        resolve: {
            extensions: [".tsx", ".ts", ".js", ".jsx", ".scss"]
        }
    },
    server: {
        mode: 'production',
        target: 'node',
        node: {
            __dirname: true
        },
        entry: path.resolve(__dirname, '../../server/index.js'),
        output: {
          path: path.resolve(__dirname, '../../dist'),
          filename: 'server.js',
          libraryTarget: 'commonjs2'
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: {
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
                    }
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        {
                            loader: 'css-loader/locals',
                            options: {
                                localsConvention: 'camelCase',
                                modules: true
                            }
                        },
                        'sass-loader'
                    ],
                }
            ]
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js", ".jsx", ".scss"]
        },
        externals: [nodeExternals()]
    }
}

module.exports = { config };