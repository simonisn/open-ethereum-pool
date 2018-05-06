import Ember from 'ember';

export default Ember.Controller.extend({  
  historicalStatsService: Ember.inject.service('historical-stats'),  
  chartBuilderService: Ember.inject.service('chart-builder'),    

  historicalStats: Ember.computed('historicalStatsService.stats', function() {
    return this.get('historicalStatsService.stats');
  }),

  historicalStatsInterval: Ember.computed('historicalStatsService.statsInterval', function() {
    return this.get('historicalStatsService.statsInterval');
  }),

  historicalStatsRetention: Ember.computed('historicalStatsService.statsRetention', function() {
    return this.get('historicalStatsService.statsRetention');
  }),

  hashrateCharts: Ember.computed('chartBuilderService.hashrateCharts', function() {
    return this.get('chartBuilderService.hashrateCharts');
  }),

  poolStats: Ember.computed(function() {
    var owner = Ember.getOwner(this);    
    var poolStats = owner.lookup('object:pool-stats');        
    
    return poolStats;
  }),

  networkStats: Ember.computed(function() {
    var owner = Ember.getOwner(this);        
    var networkStats = owner.lookup('object:network-stats');    
    
    return networkStats;
  }),

  accountStats: Ember.computed(function() {
    var owner = Ember.getOwner(this);
    var accountStats = owner.lookup('object:account-stats');

    return accountStats;
  }),

  roundPercent: Ember.computed('model', 'poolStats.roundShares', function() {    
    var poolRoundShares = this.get('poolStats.roundShares'),
        loginRoundShares = this.get('accountStats.roundShares'),      
        percent = 0;
    
    if (poolRoundShares && poolRoundShares !== 0) {
      percent = loginRoundShares / poolRoundShares;  
    }

    return percent;  
  })
});
