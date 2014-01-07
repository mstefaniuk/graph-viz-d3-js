module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: [
        'Gruntfile.js',
        'src/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    bower: {
      install: {
        options: {
          layout: "byType",
          cleanBowerDir: true
        }
      }
    },
    clean: {
      target: ["target"],
      bower: ["lib/ace","lib/requirejs"]
    },
    peg: {
      options: {exportVar: "parser"},
      xdot: {
        src: "src/grammar/xdot.pegjs",
        dest: "target/parser/xdot.js"
      },
      dot: {
        src: "src/grammar/dot.pegjs",
        dest: "target/parser/dot.js"
      }
    },
    file_append: {
      default_options: {
        files: {
          'target/parser/xdot.js': {
            prepend: "define(function () {\nvar ",
            append: "\nreturn parser;\n});"
          },
          'target/parser/dot.js': {
            prepend: "define(function () {\nvar ",
            append: "\nreturn parser;\n});"
          }
        }
      }
    },
    copy: {
      src: {
        src: ['src/*.js'],
        dest: 'target/',
        expand: true,
        flatten: true
      }
    },
    requirejs: {
      compile: {
        options: {
          name: "stage",
//          mainConfigFile: "target/config.js",
          baseUrl: "target",
          out: "target/stage.min.js"
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'target/d3dot.js',
        dest: 'target/stage.min.js'
      }
    },
    watch: {
      page: {
        files: ['src/**'],
        tasks: ['peg', 'copy:src', 'file_append'],
      },
      options: {
        interval: 100
      }
    },
    nodestatic: {
      work: {
        options: {
          port: 9999,
          keepalive: true,
          dev: true
        }
      },
      test: {
        options: {
          port: 9999,
          dev: true
        }
      }
    },
    jasmine: {
      parser: {
        options: {
          specs: 'spec/*-spec.js',
          helpers: 'spec/*-helper.js',
          host: 'http://127.0.0.1:9999/',
          keepRunner: true,
          template: require('grunt-template-jasmine-requirejs'),
          templateOptions: {
            requireConfig: {
              baseUrl: "target",
              paths: {
                text : "../lib/requirejs-text/text",
                d3: '../lib/d3/d3',
                ace: '../lib/ace',
                viz: '../lib/viz',
                dots: '../spec/dots'
              },
              shim: {
                d3: {
                  exports: 'd3'
                }
              }
            }
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-file-append');
  grunt.loadNpmTasks('grunt-peg');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodestatic');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  // Default task(s).
  grunt.registerTask('default', ['clean:target', 'peg', 'copy', 'file_append']);
  grunt.registerTask('test', ['jasmine']);
  grunt.registerTask('all', ['clean', "bower:install", 'peg', 'copy', 'file_append']);
};