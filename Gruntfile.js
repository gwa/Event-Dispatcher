module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		// tasks
		jscs: {
			src: 'src/js/Dispatcher.js',
			options: {
				config: '.jscsrc'
			}
		},

		jshint: {
			options: {
				jshintrc: true
			},
			src: [
				'src/js/Dispatcher.js'
			]
		},

		jasmine: {
			mytask: {
				options: {
					vendor: [
						'bower_components/requirejs/require.js'
					],
					specs: [
						'tests/Dispatcher.test.js'
					],
					template: require('grunt-template-jasmine-requirejs'),
					templateOptions: {
						requireConfig: {
							baseUrl: './',
							paths: {
								'Gwa.Event.Dispatcher': 'src/js/Dispatcher'
							}
						}
					}
				}
			}
		},

		copy: {
			main: {
				files: [
					{src:'src/js/Dispatcher.js', dest:'dist/Dispatcher.js'}
				]
			}
		},

		uglify: {
			main: {
				files: {
					'dist/Dispatcher.min.js': ['src/js/Dispatcher.js']
				}
			}
		},

		githooks: {
			all: {
				// Will run the jshint and test:unit tasks at every commit
				'pre-commit': 'default',
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-jscs');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-githooks');

	grunt.registerTask(
		'default',
		[
			'jscs',
			'jshint:src',
			'jasmine',
			'copy',
			'uglify'
		]
	);

};
