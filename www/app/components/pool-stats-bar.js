import Ember from 'ember';
import config from '../config/environment';

export default Ember.Component.extend({
    poolStatsService: Ember.inject.service('pool-stats'),

    model: Ember.computed('poolStatsService.model', function() {
        return this.get('poolStatsService').getModel();
    }),        

    init() {
        this._super(...arguments);
    }    
    
});
