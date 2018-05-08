import Ember from 'ember';
import Controller from '@ember/controller';
import EmberObject, { computed } from '@ember/object';

export default Controller.extend({  
  historicalStatsService: Ember.inject.service('historical-stats'),  
  chartBuilderService: Ember.inject.service('chart-builder'),    

  historicalStats: computed('historicalStatsService.stats', function() {
    return this.get('historicalStatsService.stats');
  }),

  historicalStatsInterval: computed('historicalStatsService.statsInterval', function() {
    return this.get('historicalStatsService.statsInterval');
  }),

  historicalStatsRetention: computed('historicalStatsService.statsRetention', function() {
    return this.get('historicalStatsService.statsRetention');
  }),

  hashrateCharts: computed('chartBuilderService.hashrateCharts', function() {
    return this.get('chartBuilderService.hashrateCharts');
  }),

  poolStats: computed(function() {
    var owner = Ember.getOwner(this);    
    var poolStats = owner.lookup('object:pool-stats');        
    
    return poolStats;
  }),

  networkStats: computed(function() {
    var owner = Ember.getOwner(this);        
    var networkStats = owner.lookup('object:network-stats');    
    
    return networkStats;
  }),

  accountStats: computed(function() {
    var owner = Ember.getOwner(this);
    var accountStats = owner.lookup('object:account-stats');

    return accountStats;
  }),

  roundPercent: computed('model', 'poolStats.roundShares', function() {    
    var poolRoundShares = this.get('poolStats.roundShares'),
        loginRoundShares = this.get('accountStats.roundShares'),      
        percent = 0;
    
    if (poolRoundShares && poolRoundShares !== 0) {
      percent = loginRoundShares / poolRoundShares;  
    }

    return percent;  
  })
});
