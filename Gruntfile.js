module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		babel: {
			options: {
				sourceMap: true
			},
			dist: {
				files: {
					"build/babel/app.js": "src/index.js"
				}
			}
		},
		browserify: {
			js: {
				src: 'build/babel/app.js',
				dest: 'build/browserify/app.js',
			},
		},
		concat: {
			options: {
				stripBanners: true,
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
						   '<%= grunt.template.today("yyyy-mm-dd") %> */',
			},
			dist: {
				src: ['build/browserify/app.js'],
				dest: 'dist/built.js',
			},
		},
		clean: {
			options: {
				force: true,
				expand: true,
			},
			build: {
				src: ['build/*', 'dist/*'],
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-browserify');

	// Default task(s).
	grunt.registerTask('default', 'default actions', ['babel', 'browserify', 'concat']);

};
