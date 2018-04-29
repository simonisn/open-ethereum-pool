import Ember from 'ember';

export default Ember.Controller.extend({  
  poolStatsService: Ember.inject.service('pool-stats'),
  poolStats: Ember.computed('poolStatsService.stats', function() {
    return this.get('poolStatsService').getStats();
  }),  

  roundPercent: Ember.computed('model', 'poolStats', function() {    
    var poolRoundShares = this.get('poolStats.stats.roundShares'),
        loginRoundShares = this.get('model.roundShares'),      
        percent = 0;
    
    if (poolRoundShares && poolRoundShares !== 0) {
      percent = loginRoundShares / poolRoundShares;  
    }

    return percent;  
  })
});
