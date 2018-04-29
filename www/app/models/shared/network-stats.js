import Ember from 'ember';

export default Ember.Object.extend({   
    poolStatsService: Ember.inject.service('pool-stats'),

    data: Ember.computed('poolStatsService.networkStats', function() {
        return this.get('poolStatsService.networkStats');
    }),

    difficulty: Ember.computed.reads('data.difficulty'),
    hashrate: Ember.computed.reads('data.hashrate'),
    blockchainHeight: Ember.computed.reads('data.blockchainHeight'),
    epochDate: Ember.computed.reads('data.epochDate')
});