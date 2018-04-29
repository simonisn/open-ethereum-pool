import Ember from 'ember';

export default Ember.Object.extend({   
    poolStatsService: Ember.inject.service('pool-stats'),

    data: Ember.computed('poolStatsService.poolStats', function() {
        return this.get('poolStatsService.poolStats');
    }),

    payoutThreshold: Ember.computed.reads('data.payoutThreshold'),
    poolFee: Ember.computed.reads('data.poolFee'),
    minersOnline: Ember.computed.reads('data.minersOnline'),
    hashrate: Ember.computed.reads('data.hashrate'),
    lastBlockFound: Ember.computed.reads('data.lastBlockFound'),
    newBlocks: Ember.computed.reads('data.newBlocksTotal'),
    roundVariance: Ember.computed.reads('data.roundVariance'),    
    roundShares: Ember.computed.reads('data.roundShares')
});