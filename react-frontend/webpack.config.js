const path = require('path');

module.exports = {
  resolve: {
    fallback: { 
      "crypto": require.resolve("crypto-browserify") 
    }
  },
  entry: './src/index.js',  // Update this with the correct path
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};