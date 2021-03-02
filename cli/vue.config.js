const path = require("path");

module.exports = {
  productionSourceMap: process.env.NODE_ENV !== 'production',
  outputDir: path.resolve(__dirname, "./public"),
  publicPath:'/',
  filenameHashing :false,
  	configureWebpack: {
		devServer: {
			host: '0.0.0.0',
			port: '80',
			disableHostCheck : true,
		}
	},
}