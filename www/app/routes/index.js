import Ember from 'ember';

export default Ember.Route.extend({
  poolStatsService: Ember.inject.service('pool-stats'),
  config: Ember.computed.reads('globalsService.config'), 
  
  model: function() {    
    var owner = Ember.getOwner(this);    
    var poolStats = owner.lookup('object:pool-stats');
    var networkStats = owner.lookup('object:network-stats');
   
		return {
      poolStats: poolStats,
      networkStats: networkStats
    }; 
	},

  actions: {
    lookup(login) {
      if (!Ember.isEmpty(login)) {
        return this.transitionTo('account', login);
      }
    }
  }  
});
