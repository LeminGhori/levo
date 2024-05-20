module.exports = {
    // other webpack configuration...

    module: {
        rules: [
            // other rules...
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
};
