import Ember from 'ember';
import EmberObject, { computed } from '@ember/object';

export default EmberObject.extend({   
    poolStatsService: Ember.inject.service('pool-stats'),

    data: computed('poolStatsService.networkStats', function() {
        return this.get('poolStatsService.networkStats');
    }),

    difficulty: computed('data', function() {
        return this.getWithDefault('data.difficulty', 0);
    }),
    hashrate: computed('data', function() {
        return this.getWithDefault('data.hashrate', 0);
    }),    
    blockchainHeight: computed('data', function() {
        return this.getWithDefault('data.blockchainHeight', 0);
    }),
    epochDate: computed('data', function() {
        return this.getWithDefault('data.epochDate', 0);
    })
});