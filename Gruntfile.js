module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ["target"],
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
      full: {
        src: ['src/*','lib/*'],
        filter: 'isFile',
        dest: 'target/',
        flatten: true,
        expand: true
      },
      watch: {
        src: ['src/*'],
        filter: 'isFile',
        dest: 'target/',
        flatten: true,
        expand: true
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
        tasks: ['peg','copy:watch','file_append'],
      },
      options: {
        interval: 100
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-file-append');
  grunt.loadNpmTasks('grunt-peg');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['clean', 'peg', 'copy', 'file_append']);
};