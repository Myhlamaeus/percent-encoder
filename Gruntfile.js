/* jshint node:true */

"use strict";

module.exports = function (grunt) {
    // Show elapsed time at the end
    require("time-grunt")(grunt);
    // Load all grunt tasks
    require("load-grunt-tasks")(grunt);

    // Project configuration.
    grunt.initConfig({
        config: {
            main: "percent-encoder",
            global: "PercentEncoder"
        },
        jshint: {
            options: {
                jshintrc: ".jshintrc",
                reporter: require("jshint-stylish")
            },
            gruntfile: {
                src: "Gruntfile.js"
            },
            lib: {
                src: ["<%= config.main %>.js", "object-path.js", "object-path-list.js"]
            },
            test: {
                src: ["test/**/*.js"]
            }
        },
        watch: {
            gruntfile: {
                files: "<%= jshint.gruntfile.src %>",
                tasks: ["jshint:gruntfile"]
            },
            lib: {
                files: "<%= jshint.lib.src %>",
                tasks: ["jshint:lib", "nodeunit"]
            }
        },
        babel: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    "dist/cjs.js": "<%= config.main %>.js"
                }
            }
        },
        browserify: {
            dist: {
                options: {
                    browserifyOptions: {
                        standalone: "<%= config.global %>"
                    }
                },
                files: {
                    "dist/browser.js": "dist/cjs.js"
                }
            }
        },
        uglify: {
            dist: {
                options: {
                    screwIE8: true
                },
                files: {
                    "dist/<%= config.main %>.min.js": "<%= config.main %>.js"
                }
            },
            distCjs: {
                files: {
                    "dist/cjs.min.js": "dist/cjs.js"
                }
            },
            distBrowser: {
                files: {
                    "dist/browser.min.js": "dist/browser.js"
                }
            }
        }
    });

    grunt.registerTask("test", ["jshint"]);

    grunt.task.registerTask("build:es6", ["uglify:dist"]);
    grunt.task.registerTask("build:cjs", ["babel:dist"]);
    grunt.task.registerTask("build:browser", ["babel:dist", "browserify:dist", "uglify:distBrowser"]);
};
