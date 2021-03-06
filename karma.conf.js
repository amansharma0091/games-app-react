const TARGET = process.env.npm_lifecycle_event;
const isProd = TARGET === 'build';

module.exports = function (config) {
	config.set({
		browsers: ['PhantomJS'],
		files: [
			'node_modules/babel-polyfill/dist/polyfill.js',
			'node_modules/phantomjs-function-bind-polyfill/index.js',
			'node_modules/phantomjs-polyfill-includes/includes-polyfill.js',
			'node_modules/babel-es6-polyfill/browser-polyfill.js',
			'node_modules/whatwg-fetch/fetch.js',
			'test/unit/setup/tests.bundle.js'
		],
		frameworks: ['jasmine'],
		plugins: [
			'karma-webpack',
			'karma-phantomjs-launcher',
			'karma-jasmine',
			'karma-sourcemap-loader',
			'karma-coverage',
			'istanbul-instrumenter-loader',
			'karma-spec-reporter'
		],
		preprocessors: {
			'test/unit/setup/tests.bundle.js': ['webpack', 'sourcemap']
		},
		reporters: ['spec'],
		singleRun: isProd,
		coverageReporter: {
			reporters: [
				{ type: 'text' },
				{ type: 'html' }
			],
			dir: 'test/coverage/unit/'
		},
		webpack: {
			devtool: 'inline-source-map',
			module: {
				loaders: [
					{
						test: /\.jsx?$/,
						loader: 'babel-loader',
						query: {
							presets: ['airbnb']
						}
					},
					// Ignore imported images in unit tests
					{
						test: /\.(css|png|jpe?g|gif|svg)$/,
						exclude: /(node_modules|bower_components)/,
						loader: 'null-loader',
					},
				],
			},
			externals: {
				'cheerio': 'window',
				'react/addons': true,
				'react/lib/ExecutionEnvironment': true,
				'react/lib/ReactContext': true,
				'fs': '{}'
			}
		},
		webpackMiddleware: {
			noInfo: true,
		}
	});
};
