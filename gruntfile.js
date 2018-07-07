module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {

      options: {
        stripBanners: true,
        banner: `'use strict';\n\n/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n\n`,
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
    }

  }); //initConfig

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.registerTask('default', ['concat']);
}; //wrapper function