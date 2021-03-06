/* global require, module */
var Funnel = require('broccoli-funnel');
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {    
    outputPaths: {
      app: {
        html: 'index.html',
        css: {
          'app': '/assets/css/ubiq-mining-pool.css'
        },
        js: '/assets/js/ubiq-mining-pool.js'
      },
      vendor: {
        css: '/assets/css/vendor.css',
        js: '/assets/js/vendor.js'
      }    
    }
  });

  var openIconic = new Funnel('node_modules/open-iconic', {
    srcDir: 'sprite',
    destDir: 'assets/images',
    include: ['sprite.min.svg']
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value. 
  
  // Import Bootstrap 4 native
  app.import('node_modules/bootstrap/dist/js/bootstrap.min.js');
  //app.import('node_modules/bootstrap/dist/css/bootstrap.min.css');
  
  // Import Custom Bootstrap theme
  app.import('vendor/bootstrap.min.css');

  // Import SVG Injector - Required for open-iconic sprites
  app.import('node_modules/svg-injector/dist/svg-injector.min.js', {
    using: [
      { transformation: 'amd', as: 'svg-injector' }
    ]
  });

  return app.toTree(openIconic);
};
