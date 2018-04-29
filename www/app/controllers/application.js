import Ember from 'ember';

export default Ember.Controller.extend({    
    poolStatsService: Ember.inject.service('pool-stats'),
    
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
    
    init() {
        this._super(...arguments);

        this.get('poolStatsService').start();        
    },

    willDestroy() {
        this.get('poolStatsService').stop();
    }
    
});
