import Ember from 'ember';

export default Ember.Controller.extend({  
  poolStatsService: Ember.inject.service('pool-stats'),

  poolStatsModel: Ember.computed('poolStatsService.model', function() {
      return this.get('poolStatsService').getModel();
  }),        

  roundPercent: Ember.computed('model', 'poolStatsModel', {
    get() {
      var poolRoundShares = this.get('poolStatsModel.stats.roundShares'),
          loginRoundShares = this.get('model.roundShares'),      
          percent = 0;
      
      if (poolRoundShares && poolRoundShares !== 0) {
        percent = loginRoundShares / poolRoundShares;  
      }

      return percent;
    }
  })
});
