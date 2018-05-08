import Ember from 'ember';
import EmberObject, { computed } from '@ember/object';

export default EmberObject.extend({   
    poolStatsService: Ember.inject.service('pool-stats'),

    data: computed('poolStatsService.poolStats', function() {
        return this.get('poolStatsService.poolStats');
    }),

    payoutThreshold: computed('data', function() {
        return this.getWithDefault('data.payoutThreshold', 0);
    }),
    poolFee: computed('data', function() {
        return this.getWithDefault('data.poolFee', 0);
    }),
    minersOnline: computed('data', function() {
        return this.getWithDefault('data.minersOnline', 0);
    }),
    hashrate: computed('data', function() {
        return this.getWithDefault('data.hashrate', 0);
    }),
    lastBlockFound: computed('data', function() {
        return this.getWithDefault('data.lastBlockFound', 0);
    }),
    newBlocks: computed('data', function() {
        return this.getWithDefault('data.newBlocks', 0);
    }),
    roundVariance: computed('data', function() {
        return this.getWithDefault('data.roundVariance', 0);
    }),    
    roundShares: computed('data', function() {
        return this.getWithDefault('data.roundShares', 0);
    })
});