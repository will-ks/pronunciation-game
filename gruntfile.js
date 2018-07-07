module.exports = function (grunt) {
  grunt.initConfig({

    concat: {
      dist: {
        src: [
          'components/scripts/libs/*.js',
          'components/scripts/data.js',
          'components/scripts/main.js',
          'components/scripts/game.js',
          'components/scripts/player.js'
        ],
        dest: 'builds/js/script.js'
      }
    }

  }); //initConfig

  grunt.loadNPMTasks('grunt-contrib-concat');
}; //wrapper function