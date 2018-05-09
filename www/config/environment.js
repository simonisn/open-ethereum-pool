/* jshint node: true */
module.exports = function (environment) {
  var ENV = {
    modulePrefix: 'ubiq-mining-pool',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },
    'ember-logging-service': {
      enabled: true,
      errorsEnabled: true
    },
    APP: {
      PoolName: 'UbiqMining.net',
      
      ApiUrl: 'http://www.ubiqmining.net/',

      // HTTP (getWork) mining endpoint
      HttpHost: 'http://ubiqmining.net',
      HttpPort: 8888,

      // Stratum mining endpoint
      StratumHost: 'ubiqmining.net',
      StratumPort: 8008,

      // Fee and payout details
      PoolFee: '0.5%',
      PayoutThreshold: '1 UBQ',

      // For network hashrate (change for your favourite fork)
      BlockTime: 88,

      // Average number of blocks before block is matured
      BlockMaturity: 100,

      // Number of blocks in an epoch
      EpochBlockCount: 30000,

      // Rate at which stats are refreshed
      APIRefreshRate: {        
        poolStats: 10000,    // 10 Seconds 
        minerStats: 10000,   // 10 Seconds
        blocks: 30000,       // 30 Seconds
        payments: 60000,     // 60 Seconds
        historical: 300000   // 5 Minutes
      }
    }
  };

  if (environment === 'development') {
     ENV.APP.ApiUrl = 'http://localhost:8080/';
     
     ENV.APP.LOG_RESOLVER = true;
     ENV.APP.LOG_ACTIVE_GENERATION = true;
     ENV.APP.LOG_TRANSITIONS = true;
     ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
     ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;
    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;

};
