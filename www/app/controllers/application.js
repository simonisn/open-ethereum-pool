import Ember from 'ember';

export default Ember.Controller.extend({    
    poolStatsService: Ember.inject.service('pool-stats'),
    
    poolStats: Ember.computed(function() {
        var owner = Ember.getOwner(this);    
        var poolStats = owner.lookup('object:pool-stats');

        console.log('application controller : poolStats lookup', poolStats);      
        
        return poolStats;
    }),

    networkStats: Ember.computed(function() {
        var owner = Ember.getOwner(this);    
        var networkStats = owner.lookup('object:network-stats');

        console.log('application controller : networkStats lookup', networkStats);      
        
        return networkStats;
    }),
    
    init() {
        this._super(...arguments);

        var serviceStartVal = this.get('poolStatsService').start();

        console.log('serviceStartVal', serviceStartVal);
    },

    willDestroy() {
        this.get('poolStatsService').stop();
    }
    
});
