import Ember from 'ember';

export default Ember.Controller.extend({  
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

  roundPercent: Ember.computed('model', 'poolStats.roundShares', function() {    
    var poolRoundShares = this.get('poolStats.roundShares'),
        loginRoundShares = this.get('model.roundShares'),      
        percent = 0;
    
    if (poolRoundShares && poolRoundShares !== 0) {
      percent = loginRoundShares / poolRoundShares;  
    }

    return percent;  
  })
});
