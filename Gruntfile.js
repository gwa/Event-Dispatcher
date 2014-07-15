module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		// tasks
		jscs:         grunt.file.readJSON('./grunt/tasks/jscs.json'),
		jshint:       grunt.file.readJSON('./grunt/tasks/jshint.json'),

		jasmine: {
			mytask: {
				options: {
					vendor: [
						"bower_components/requirejs/require.js"
					],
					specs: [
						"tests/GT.Event.Dispatcher.test.js"
					],
					template: require('grunt-template-jasmine-requirejs'),
					templateOptions: {
						requireConfig: {
							baseUrl: './',
							paths: {
								'GT.Event.Dispatcher': 'src/js/GT/Event/Dispatcher'
							}
						}
					}
				}
			}
		},

		copy: {
			main: {
				files: [
					{src:'src/js/GT/Event/Dispatcher.js', dest:'dist/GT/Event/Dispatcher.js'}
				]
			}
		},

		uglify: {
			main: {
				files: {
					'dist/GT/Event/Dispatcher.min.js': ['src/js/GT/Event/Dispatcher.js']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-jscs');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');

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
