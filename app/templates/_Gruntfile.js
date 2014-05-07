module.exports = function(grunt) {

    var path = {
        bower: 'dev/bower_components/',
        js: 'dev/js/',
        css: 'dev/css/'
    }

  // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            modernizr: {
                options: {
                    banner: '/*! <%%= pkg.name %> - v<%%= pkg.version %> | Modernizr - ' +
                    '<%%= grunt.template.today("dd-mm-yyyy") %> */\n'
                },
                files: {
                    'dev/js/modernizr.js': [path.bower + 'modernizr/modernizr.js']
                }
            },  <% if(jsRespond || jsPlaceholder) { %>
            plugins: {
                options: {
                    banner: '/*! <%%= pkg.name %> - v<%%= pkg.version %> | Plugins - ' +
                    '<%%= grunt.template.today("dd-mm-yyyy") %> */\n'
                },
                files: {
                    'dev/js/plugins.js': [  <% } if(jsRespond) { %> 
                        path.bower + 'respond/dest/respond.min.js', <% } if(jsPlaceholder) { %>
                        path.bower + 'Placeholders.js/build/placeholders.min.js'
                    ]
                }
            },  <% } if(jsOption.indexOf('zepto') !== -1) { %>
            zepto: {
                options: {
                    banner: '/*! <%%= pkg.name %> - v<%%= pkg.version %> | Zepto - ' +
                    '<%%= grunt.template.today("dd-mm-yyyy") %> */\n'
                },
                files: {
                    'dev/js/zepto.min.js': [path.bower + 'zeptojs/src/zepto.js']
                }
            }, <% } %>
            js: {
                options: {
                    banner: '/*! <%%= pkg.name %> - v<%%= pkg.version %> | Scripts - ' +
                    '<%%= grunt.template.today("dd-mm-yyyy") %> */\n'
                },
                files: {
                    'dist/js/scripts.js': [path.js + 'scripts.js']
                }
            }
        },       
        copy: { <% if(jsOption.indexOf('jquery') !== -1) { %>
            jquery: { 
                src: path.bower + 'jquery/dist/jquery.min.js',
                dest: 'dev/js/dist/jquery.min.js'
            },
            jqueryBuild: {
                src: 'dev/js/jquery.min.js',
                dest: 'dist/js/jquery.min.js'
            },  <% } %>
            <% if(cssOption.indexOf('less') !== -1) { %>
            lesshat: {
                src: path.bower + 'lesshat/build/lesshat.less',
                dest: path.css + 'less/lesshat.less'
            }, <% } %>
            fonts: {
                expand: true,
                cwd: 'dev/fonts',
                src: '**',
                dest: 'dist/fonts',
                flatten: true,
                filter: 'isFile',
            },
            html: {
                expand: true,
                cwd: 'dev/',
                src: '*.html',
                dest: 'dist/',
                flatten: true,
                filter: 'isFile',
            },
            favicon: {
                expand: true,
                cwd: 'dev/',
                src: 'favicon.ico',
                dest: 'dist/',
                flatten: true,
                filter: 'isFile',
            }
        },  <% if(cssOption.indexOf('less') !== -1) { %>
        less: {
            dev: {
                options: {
                paths: [ path.css + 'less']
            },
            files: {
              'dev/css/style.css': path.css + 'less/style.less'
            }
          },
          dist: {
            options: {
                paths: [ path.css + 'less'],
                cleancss: true
            },
            files: {
                'dist/css/style.css': path.css + 'less/style.less'
            }
          }
        },  <% } if(cssOption.indexOf('sass') !== -1) { %>
        compass: {
            dev: {
                options: {
                    sassDir: path.css + 'sass',
                    cssDir: path.css
                }
            },
            dist: {
                options: {
                    sassDir: path.css + 'sass',
                    cssDir: 'dist/css',
                    outputStyle: 'compressed',
                    environment: 'production'
                }
            }
        },   <% } if(cssOption.indexOf('stylus') !== -1) { %>
        stylus: {
            dev: {
                options: {
                    paths: [path.css + 'stylus'],
                    compress: false,
                    use: [
                        require('nib')
                    ]
                },
                files: {
                    'dev/css/style.css': 'dev/css/stylus/style.styl',
                }
            },
            dist: {
                options: {
                    paths: [path.css + 'stylus'],
                    compress: true,
                    use: [
                        require('nib')
                    ]
                },
                files: {
                    'dist/css/style.css': 'dev/css/stylus/style.styl',
                }
            }
        },   <% }  if(jsHint) { %>
        jshint: {
            dev: {
                options: {
                    curly: true,
                    eqeqeq: true,
                    eqnull: true,
                    browser: true,
                    globals: {
                        jQuery: true
                    }
                },
                files: {
                    src: ['dev/js/scripts.js']
                }
            }
        }, <% } %>
        imagemin: {
            dynamic: {                        
                files: [{
                    expand: true,                  
                    cwd: 'dev/img/',                  
                    src: ['**/*.{png,jpg,gif}', '!_src/*'],   
                    dest: 'dist/img/'
                }]
            }
        },
        connect: {
            server: {
                options: {
                    port: 8000,
                    base: 'dev/',
                    livereload: true
                }
            }
        },
        watch: {
            tasks: 'watching',
            options: {
                livereload: true
            },
            html: {
                files: '**/*.html'
            },  <% if(cssOption.indexOf('less') !== -1) { %>
            less: {
                files: 'dev/css/less/*.less',
                tasks: ['less:dev', 'notify:preprocessor']
            },  <% } if(cssOption.indexOf('sass') !== -1) { %>
            compass: {
                files: 'dev/css/sass/*.scss',
                tasks: ['compass:dev', 'notify:preprocessor'],
            },  <% } if(cssOption.indexOf('stylus') !== -1) { %>
            stylus: {
                files: 'dev/css/stylus/*.styl',
                tasks: ['stylus:dev', 'notify:preprocessor']
            },  <% } if(jsHint) { %>
            jshint: {
                files: 'dev/js/scripts.js',
                tasks: ['jshint', 'notify:jshint']
            } <% } %>
        },
        notify: {
            preprocessor: {
                options: {
                    title: 'CSS',
                    message: 'Preprocessor ran succesfully!'
                }
            },
            dist: {
                options: {
                    title: 'Deploy',
                    message: 'Your dist folder is ready to go!'
                }
            },
            server: {
                options: {
                    message: 'Server is ready!'
                }
            },  <% if(jsHint) { %>
            jshint: {
                options: {
                    title: 'JS',
                    message: 'jsHint ran succesfully!'
                }
            } <% } %>
        }
    });
    
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify'); <% if(cssOption.indexOf('less') !== -1) { %>
    grunt.loadNpmTasks('grunt-contrib-less'); <% } if(cssOption.indexOf('sass') !== -1) { %>
    grunt.loadNpmTasks('grunt-contrib-compass'); <% } if(cssOption.indexOf('stylus') !== -1) { %>
    grunt.loadNpmTasks('grunt-contrib-stylus'); <% } if(jsHint) { %>
    grunt.loadNpmTasks('grunt-contrib-jshint'); <% } %>
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
    grunt.registerTask(
        'init', 
        [   
            'uglify:modernizr', <% if(jsPlaceholder || jsRespond) { %>
            'uglify:plugins', <% } if(jsOption.indexOf('zepto') !== -1) { %>
            'uglify:zepto', <% } if(cssOption.indexOf('less') !== -1) { %>
            'copy:lesshat', <% } if(jsOption.indexOf('jquery') !== -1) { %>
            'copy:jquery', <% } %>
            'default'
    ]);

    grunt.registerTask(
        'default', 
        [   <% if(cssOption.indexOf('less') !== -1) { %>
            'less:dev', <% } if(cssOption.indexOf('sass') !== -1) { %>
            'compass:dev', <% } if(cssOption.indexOf('stylus') !== -1) { %>
            'stylus:dev', <% } %>
            'connect',
            'notify:server',
            'watch'
    ]);

    grunt.registerTask(
        'build', 
        [   
            'uglify:js', <% if(jsOption.indexOf('jquery') !== -1) { %>
            'copy:jqueryBuild', <% } %>
            'copy:html',
            'copy:fonts',
            'copy:favicon',
            'imagemin', <% if(cssOption.indexOf('less') !== -1) { %>
            'less:dist', <% } if(cssOption.indexOf('sass') !== -1) { %>
            'compass:dist', <% } if(cssOption.indexOf('stylus') !== -1) { %>
            'stylus:dist', <% } %>
            'notify:dist'
    ]);


};