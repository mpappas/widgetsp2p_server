module.exports = function (grunt) {

    // Configure main project settings
    grunt.initConfig({

        // Basic settings and info about our plugins
        pkg: grunt.file.readJSON('package.json'),

        // Name of plugin (plugin name without the "grunt-contrib-")
        cssmin: {
            combine: {
                files: {
                    // Just an example
                    // 'html/css/main.css': ['html/css/content.css', 'html/css/sidebar.css']
                }
            }
        },

        // uglify
        uglify: {
            dist: {
                files: {
                    // Just an example
                    // 'html/js/toggle.min.js': ['html/js/toggle.js']
                }
            }
        },


        // Concat  Example
        // concat: {
        //     js: {
        //         src: ['js/intro.js', 'js/project.js', 'js/outro.js'],
        //         dest: 'build/js/script.js',
        //     },
        //     css: {
        //         src: ['css/main.css', 'css/theme.css'],
        //         dest: 'build/css/main.css',
        //     },
        // },


        watch: {
            scripts: {
                files: ['js/**/*.js'],
                tasks: ['concat' /*or any other plugin I want to use, like jshint*/],
                options: {
                    spawn: false,
                },
            },
        },
    });

    // Load the plugin
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Do the task
    grunt.registerTask('default', ['cssmin', 'uglify']);

};


