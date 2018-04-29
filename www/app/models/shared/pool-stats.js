import Ember from 'ember';

export default Ember.Object.extend({   
    poolStatsService: Ember.inject.service('pool-stats'),

    data: Ember.computed('poolStatsService.poolStats', function() {
        return this.get('poolStatsService.poolStats');
    }),

    payoutThreshold: Ember.computed('data', function() {
        return this.getWithDefault('data.payoutThreshold', 0);
    }),
    poolFee: Ember.computed('data', function() {
        return this.getWithDefault('data.poolFee', 0);
    }),
    minersOnline: Ember.computed('data', function() {
        return this.getWithDefault('data.minersOnline', 0);
    }),
    hashrate: Ember.computed('data', function() {
        return this.getWithDefault('data.hashrate', 0);
    }),
    lastBlockFound: Ember.computed('data', function() {
        return this.getWithDefault('data.lastBlockFound', 0);
    }),
    newBlocks: Ember.computed('data', function() {
        return this.getWithDefault('data.newBlocks', 0);
    }),
    roundVariance: Ember.computed('data', function() {
        return this.getWithDefault('data.roundVariance', 0);
    }),    
    roundShares: Ember.computed('data', function() {
        return this.getWithDefault('data.roundShares', 0);
    })
});