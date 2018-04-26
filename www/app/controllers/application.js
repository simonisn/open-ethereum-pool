import Ember from 'ember';

export default Ember.Controller.extend({    
    poolStatsService: Ember.inject.service('pool-stats'),

    init() {
        this.get('poolStatsService').start();        
    },

    willDestroy() {
        this.get('poolStatsService').stop();
    }
    
});
