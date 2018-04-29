import Ember from 'ember';

export default Ember.Controller.extend({    
    poolStatsService: Ember.inject.service('pool-stats'),
    
    poolStats: Ember.computed(function() {
        var owner = Ember.getOwner(this);    
        var poolStats = owner.lookup('object:pool-stats');

        console.log('application controller : poolStats lookup', poolStats);      
        
        return poolStats;
    }),
    
    init() {
        this.get('poolStatsService').start();            
    },

    willDestroy() {
        this.get('poolStatsService').stop();
    }
    
});
