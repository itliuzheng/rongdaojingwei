const path = require("path");
//const publicPath = process.env.NODE_ENV === "prod" ? "/static/" : "/"; //font scss资源路径 不同环境切换控制
module.exports = {
	runtimeCompiler: true,
	productionSourceMap: false,
	publicPath: '/', // 设置打包文件相对路径
	outputDir: process.env.NODE_ENV === "development" ? 'devdist' : 'dist',
	assetsDir: "static",
	devServer: {
		// open: process.platform === 'darwin',
		// host: 'localhost',
		host: '0.0.0.0',
		port: 8080,
		// open: true, //配置自动启动浏览器
		proxy: {
			'/': {
				//target: 'http://refined.iok.la/rongdao', //对应自己的接口
				target: 'http://www.rongdaojingwei.com/rongdao', //对应自己的接口
				changeOrigin: true,
				ws: false,
				pathRewrite: {
					'/': ''
				}
			},
			'/login': {
				//target: 'http://refined.iok.la/rongdao', //对应自己的接口
				target: 'http://www.rongdaojingwei.com/rongdao', //对应自己的接口
				changeOrigin: true,
				ws: false,
				pathRewrite: {
					'/login': ''
				}
			},
		}
	},
	configureWebpack: () => ({
		resolve: {
			alias: {
				"@": path.resolve("./src")
			}
		}
	}),
	chainWebpack: config => {
		config.plugin("define").tap(args => {
			args[0]["process.env"].BASE_URL = JSON.stringify(process.env.BASE_URL);
			return args;
		});
	},

}
