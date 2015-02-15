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
          cleanBowerDir: true,
          bowerOptions: {
            production: false
          }
        }
      }
    },
    clean: {
      target: ["target"],
      bower: ["lib/ace", "lib/requirejs"]
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
        files: ['src/**', 'spec/**'],
        tasks: ['build', 'check']
      },
      options: {
        interval: 100
      }
    },
    nodestatic: {
      serve: {
        options: {
          port: 9999,
          dev: true
        }
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },
    coveralls: {
      options: {
        force: true
      },
      phantom: {
        src: "coverage/PhantomJS*/lcov.info"
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
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-coveralls');

  // Default task(s).
  grunt.registerTask('default', ['build']);
  grunt.registerTask('build', ['bower:install', 'compile']);
  grunt.registerTask('compile', ['clean:target', 'peg', 'copy', 'file_append']);
  grunt.registerTask('test', ['karma']);
  grunt.registerTask('serve', ['compile', 'nodestatic:serve:keepalive']);
  grunt.registerTask('all', ['build', 'test']);
};