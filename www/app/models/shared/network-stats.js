import Ember from 'ember';

export default Ember.Object.extend({   
    poolStatsService: Ember.inject.service('pool-stats'),

    data: Ember.computed('poolStatsService.networkStats', function() {
        return this.get('poolStatsService.networkStats');
    }),

    difficulty: Ember.computed('data', function() {
        return this.getWithDefault('data.difficulty', 0);
    }),
    hashrate: Ember.computed('data', function() {
        return this.getWithDefault('data.hashrate', 0);
    }),    
    blockchainHeight: Ember.computed('data', function() {
        return this.getWithDefault('data.blockchainHeight', 0);
    }),
    epochDate: Ember.computed('data', function() {
        return this.getWithDefault('data.epochDate', 0);
    })
});