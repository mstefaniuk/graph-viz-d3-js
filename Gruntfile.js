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
      unit: {
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
      dist: ["dist"],
      bower: ["lib/"]
    },
    peg: {
      options: {exportVar: "parser"},
      xdot: {
        src: "src/grammar/xdot.pegjs",
        dest: "parser/xdot.js"
      },
      dot: {
        src: "src/grammar/dot.pegjs",
        dest: "parser/dot.js"
      }
    },
    file_append: {
      default_options: {
        files: {
          'parser/xdot.js': {
            prepend: "define(function () {\nvar ",
            append: "\nreturn parser;\n});"
          },
          'parser/dot.js': {
            prepend: "define(function () {\nvar ",
            append: "\nreturn parser;\n});"
          }
        }
      }
    },
    copy: {
      dist: {
        files: [
          {cwd: 'src/lib', src: 'viz.js', dest: 'dist', expand: true}
        ]
      }
    },
    requirejs: {
      options: {
        mainConfigFile: "src/main.js",
        baseUrl: "src/js",
        skipDirOptimize: false,
        paths: {
          requireLib: "../../lib/requirejs/require",
          d3: "empty:",
          "requirejs-web-workers": "empty:",
          viz: "empty:",
          ace: "empty:"
        }
      },
      renderer: {
        options: {
          name: "renderer",
          out: "dist/renderer.js"
        }
      },
      worker: {
        options: {
          name: "layout-worker",
          out: "dist/layout-worker.js",
          onBuildRead: function (moduleName, path, contents) {
            return contents.replace(/importScripts\([^)]+\)/gi, '');
          },
          include: ['requireLib']
        }
      },
      mode: {
        options: {
          name: "editor/mode/pegjs",
          out: "dist/ace-mode.js"
        }
      },
      annotator: {
        options: {
          name: "dot-checker",
          out: "dist/dot-checker.js"
        }
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
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-coveralls');

  // Macro tasks
  grunt.registerTask('default', ['build']);
  grunt.registerTask('build', ['clean:dist', 'compile']);
  grunt.registerTask('compile', ['peg', 'file_append']);
  grunt.registerTask('test', ['bower:unit', 'karma']);
  grunt.registerTask('dist', ['requirejs', 'copy:dist']);
  grunt.registerTask('all', ['build', 'test', 'dist']);
};
