const { exec } = require('child_process');
const path = require('path');

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const options = {
    entry: {
        client: path.join(__dirname, 'src', 'js', 'client.js'),
    },
    mode: 'development',
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].bundle.js',
    },
    plugins: [
        {
            apply: (compiler) => {
                compiler.hooks.afterEmit.tap('GenerateManifestPlugin', () => {
                    exec('node ./utils/generate-manifest.js', (err, stdout, stderr) => {
                        if (stdout) process.stdout.write(stdout);
                        if (stderr) process.stderr.write(stderr);
                    });
                });
            },
        },
        new VueLoaderPlugin(),
        new CopyWebpackPlugin([
            { from: 'src/js/background.js', to: '' },
        ]),
    ],
    module: {
        rules: [
            {
                test: /\.(js|vue)$/,
                enforce: 'pre',
                exclude: /node_modules/,
                loader: 'eslint-loader',
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                ],
            },
        ],
    },
    devtool: 'source-map',
};

module.exports = options;

