
module.exports = function(grunt) {

  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // JSHint - Error check javascript
    jshint: {
      dist: {
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
          src: ['Gruntfile.js', 'js/lib/nav.js', 'js/lib/jumplink.js', 'js/lib/outlink.js', 'js/lib/onc.js', 'js/lib/infographics.js']
        }
      }
    },

    // Uglify - Minify and concatenate js files
    uglify: {
      dist: {
        options : {
          mangle : false,
          compress : true
        },
        src: ['js/lib/jumplink.js','js/lib/outlink.js', 'js/vendor/jquery.js', 'js/lib/nav.js', 'js/vendor/sticky-kit.js', 'js/vendor/jquery-scrollspy.js', 'js/lib/onc.js', 'js/lib/infographics.js'],
        dest: 'js/base.js'
      }
    },

    // Shell - Jekyll build and serve tasks via shell
    shell: {
      jekyllBuild: {
        command: 'bundle exec jekyll build'
      },
      jekyllDeployBuild: {
        command: 'bundle exec jekyll build --config _config-prod.yml'
      },
      jekyllServe: {
        command: 'bundle exec jekyll serve --watch'
      },
      jekyllDeployServe: {
        command: 'bundle exec jekyll serve --watch --config _config-prod.yml'
      }
    },

    // Imagemin - Run image optimization on img folder
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'img/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'img/'
        }]
      }
    },

    // HTML lint - run html validation on compiled site
    htmllint: {
      all: ["_site/**/*.html"]
    },

    // Accessibility - run accessibility scan on compiled site
    accessibility: {
      options : {
        accessibilityLevel: 'WCAG2A',
        reportLevels: {
          notice: false,
          warning: true,
          error: true
        },
        ignore : [
          'WCAG2A.Principle1.Guideline1_1.1_1_1.H67.2', // empty alt tag warning
          'WCAG2A.Principle1.Guideline1_3.1_3_1.H48', // navigation false positive warning
          'WCAG2A.Principle1.Guideline1_3.1_3_1.H42', // suspected heading
          'WCAG2A.Principle1.Guideline1_3.1_3_1.H39.3.NoCaption', // No table caption
          'WCAG2A.Principle1.Guideline1_3.1_3_1.H73.3.NoSummary' // No table summary
          ]
      },
      test : {
        // exclude pattern library due to intentionally invalid code
        src: ['_site/**/*.html', '!_site/patterns/index.html']
      }
    },

    // Update - find new versions of Grunt dependencies
    devUpdate: {
      main: {
        options: {
          updateType: 'prompt',
          reportUpdated: false,
          semver: false,
          packages: {
            devDependencies: true,
            dependencies: false
          },
          packageJson: null
        }
      }
    }

  });

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  // grunt - runs js, then serve tasks (see below)
  grunt.registerTask('default', ['js', 'serve']);

  // grunt serve - Serve and watch Jekyll site + SCSS compilation
  grunt.registerTask('serve', ['shell:jekyllServe']);

  // grunt build - Run js, imagemin tasks, then build Jekyll site + SCSS compilation
  grunt.registerTask('build', ['js', 'images', 'shell:jekyllBuild']);

  // grunt buildfordeploy - Run js, then build Jekyll site + SCSS compilation
  // using production-specific config file
  grunt.registerTask('buildfordeploy', ['js', 'shell:jekyllDeployBuild']);

  // grunt servefordeploy - Run js, then serve Jekyll site + SCSS compilation
  // using production-specific config file
  grunt.registerTask('servefordeploy', ['js', 'shell:jekyllDeployServe']);

  // grunt js - Error checks, concatenation, minify JS
  grunt.registerTask('js', ['jshint', 'uglify']);

  // grunt images - Run image optimization
  grunt.registerTask('images', ['imagemin']);

  // grunt validate-html - Validate compiled site's HTML
  grunt.registerTask('validate-html', ['htmllint']);

  // grunt a11y - Validate compiled site's accessibility
  grunt.registerTask('a11y', ['accessibility']);

  // grunt update - Find new versions of Grunt libraries
  grunt.registerTask('update', ['devUpdate']);

};
