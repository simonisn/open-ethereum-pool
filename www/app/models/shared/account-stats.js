import Ember from 'ember';
import EmberObject, { computed } from '@ember/object';

export default EmberObject.extend({
    accountStatsService: Ember.inject.service('account-stats'),

    accountStats: computed('accountStatsService.accountStats', function() {
        return this.get('accountStatsService.accountStats');
    }),

    login: computed('accountStats.login', function() {
        return this.getWithDefault('accountStats.login', 0);
    }),

    immature: computed('accountStats.stats.immature', function() {
        return this.getWithDefault('accountStats.stats.immature', 0);
    }),

    pending: computed('accountStats.stats.pending', function() {
        return this.getWithDefault('accountStats.stats.pending', 0);
    }),

    balance: computed('accountStats.stats.balance', function() {
        return this.getWithDefault('accountStats.stats.balance', 0);
    }),    

    paid: computed('accountStats.stats.paid', function() {
        return this.getWithDefault('accountStats.stats.paid', 0);
    }),  

    blocksFound: computed('accountStats.stats.blocksFound', function() {
        return this.getWithDefault('accountStats.stats.blocksFound', 0);
    }),      

    lastShare: computed('accountStats.stats.lastShare', function() {
        return this.getWithDefault('accountStats.stats.lastShare', 0);
    }),      

    workersOnline: computed('accountStats.workersOnline', function() {
        return this.getWithDefault('accountStats.workersOnline', 0);
    }),

    workersOffline: computed('accountStats.workersOffline', function() {
        return this.getWithDefault('accountStats.workersOffline', 0);
    }),

    shortHashrate: computed('accountStats.currentHashrate', function() {
        return this.getWithDefault('accountStats.currentHashrate', 0);
    }),

    longHashrate: computed('accountStats.hashrate', function() {
        return this.getWithDefault('accountStats.hashrate', 0);
    }),

    roundShares: computed('accountStats.roundShares', function() {
        return this.getWithDefault('accountStats.roundShares', 0);
    }),

    workers: computed('accountStats.workers', function() {
        return this.getWithDefault('accountStats.workers', 0);
    }),

    payments: computed('accountStats.payments', function() {
        return this.getWithDefault('accountStats.payments', []);
    }),

    paymentsTotal: computed('accountStats.paymentsTotal', function() {
        return this.getWithDefault('accountStats.paymentsTotal', 0);
    }),

    pageSize: computed('accountStats.pageSize', function() {
        return this.getWithDefault('accountStats.pageSize', 0);
    })

});


