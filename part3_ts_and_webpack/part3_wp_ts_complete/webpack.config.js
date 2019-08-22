const path = require('path');

module.exports = function(env, argv) {
	return {
  	entry: './src/index.tsx',
  	module: {
    		rules: [
      		{
        			test: /\.tsx?$/,
        			use: 'ts-loader',
        			exclude: /node_modules/,
      		}
      	]
    }
  }
}