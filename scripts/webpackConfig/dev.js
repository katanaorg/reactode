const path = require('path');
const webpack = require('webpack');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');

const config = {
    client: {
        mode: 'development',
        devtool: 'cheap-module-source-map',
        entry: [
            'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true',
            path.resolve(__dirname, '../../src/index.js')
        ],
        output: {
            path: path.resolve(__dirname, '../../build'),
            filename: 'js/[name].bundle.js',
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
                        //MiniCssExtractPlugin.loader,
                        'style-loader', // For webpack hmr
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
                            name: 'images/[name].[contentHash].[ext]',
                        },
                        },
                    ],
                }              
            ]
        },
        plugins: [
            // new MiniCssExtractPlugin({
            //     filename: 'css/[name].css'
            //   }),
            new webpack.HotModuleReplacementPlugin()
        ],
        resolve: {
            extensions: [".tsx", ".ts", ".js", ".jsx", ".scss"]
        },
    },
    server: {
        mode: 'development',
        target: 'node',
        node: {
            __dirname: true
        },
        entry: path.resolve(__dirname, '../../server/index.js'),
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