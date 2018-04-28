import Ember from 'ember';
import config from '../config/environment';

export default Ember.Controller.extend({    
    poolStatsService: Ember.inject.service('pool-stats'),

    get config() {
        return config.APP;
    },
    
    init() {
        this.get('poolStatsService').start();        
    },

    willDestroy() {
        this.get('poolStatsService').stop();
    }
    
});
