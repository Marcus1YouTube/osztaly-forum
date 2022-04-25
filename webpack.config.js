module.exports = {
    entry: {
        index: './src/index.js',
        signup: './src/signup.js',
        login: './src/login.js',
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].bundle.js'
    },
}