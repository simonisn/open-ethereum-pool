import Ember from 'ember';
import Route from '@ember/routing/route';
import EmberObject, { computed } from '@ember/object';

export default Route.extend({
  poolStatsService: Ember.inject.service('pool-stats'),  
  
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
