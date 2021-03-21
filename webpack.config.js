const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProd = process.env.NODE_ENV === "production";

const filename = (ext) => {
	const extension = ext.startsWith("[") ? ext : `.${ext}`;
	return isProd ? `[name]-[hash:8]${extension}` : `[name]${extension}`;
};

const target = () => (isProd ? "browserslist" : "web");

const devtool = () => (isProd ? false : "eval-source-map");

module.exports = {
	context: path.resolve(__dirname, "src"),
	mode: "development",
	entry: "./index.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: `${filename("js")}`,
		publicPath: "/",
		clean: true,
	},
	target: target(),
	devServer: {
		contentBase: path.resolve(__dirname, "dist"),
		port: 3000,
		open: true,
		compress: true,
		hot: true,
		historyApiFallback: true,
	},
	devtool: devtool(),
	module: {
		rules: [
			{
				test: /\.js$/i,
				exclude: /node_modules/,
				use: "babel-loader",
			},
			{
				test: /\.html$/i,
				use: ["html-loader"],
			},
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},
			{
				test: /\.s[ca]ss$/i,
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
			},
			{
				test: /\.(gif|png|jpe?g)$/i,
				type: "asset/resource",
				generator: {
					filename: `images/${filename("[ext]")}`,
				},
			},
			{
				test: /\.(ttf|otf|eot|woff|woff2)$/i,
				type: "asset/resource",
				generator: {
					filename: `fonts/${filename("[ext]")}`,
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./index.html",
			filename: "index.html",
			minify: {
				collapseWhitespace: isProd,
			},
		}),
		new MiniCssExtractPlugin({
			filename: filename("css"),
		}),
	],
};
