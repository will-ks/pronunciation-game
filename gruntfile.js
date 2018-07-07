module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {

      options: {
        stripBanners: true,
        banner: `'use strict';\n\n/*! <%= pkg.name %> - v<%= pkg.version %> */\n\n`,
        process: function (src, filepath) {
          return '// -------------------------------\n// Source: ' + filepath + '\n// -------------------------------\n\n' +
            src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
        },
      },
      dist: {
        src: [
          // 'components/scripts/libs/*.js',
          'components/scripts/data.js',
          'components/scripts/main.js',
          'components/scripts/game.js',
          'components/scripts/player.js'
        ],
        dest: 'builds/js/script.js'
      }
    }, // concat

    connect: {
      server: {
        options: {
          hostname: 'localhost',
          port: 3000,
          base: 'builds',
          livereload: true
        }
      }
    }, //connect

    watch: {
      options: {
        spawn: false,
        livereload: true
      },
      scripts: {
        files: ['components/scripts/*.js',
          'builds/*.html', 'builds/styles/*.css']
      },
      tasks: ['concat']
    }
  }); //initConfig

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.registerTask('default', ['concat', 'connect', 'watch']);
}; //wrapper function