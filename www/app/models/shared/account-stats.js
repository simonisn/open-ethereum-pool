import Ember from 'ember';

export default Ember.Object.extend({
    accountStatsService: Ember.inject.service('account-stats'),

    accountStats: Ember.computed('accountStatsService.accountStats', function() {
        return this.get('accountStatsService.accountStats');
    }),

    login: Ember.computed('accountStats.login', function() {
        return this.getWithDefault('accountStats.login', 0);
    }),

    immature: Ember.computed('accountStats.stats.immature', function() {
        return this.getWithDefault('accountStats.stats.immature', 0);
    }),

    pending: Ember.computed('accountStats.stats.pending', function() {
        return this.getWithDefault('accountStats.stats.pending', 0);
    }),

    balance: Ember.computed('accountStats.stats.balance', function() {
        return this.getWithDefault('accountStats.stats.balance', 0);
    }),    

    paid: Ember.computed('accountStats.stats.paid', function() {
        return this.getWithDefault('accountStats.stats.paid', 0);
    }),  

    blocksFound: Ember.computed('accountStats.stats.blocksFound', function() {
        return this.getWithDefault('accountStats.stats.blocksFound', 0);
    }),      

    lastShare: Ember.computed('accountStats.stats.lastShare', function() {
        return this.getWithDefault('accountStats.stats.lastShare', 0);
    }),      

    workersOnline: Ember.computed('accountStats.workersOnline', function() {
        return this.getWithDefault('accountStats.workersOnline', 0);
    }),

    workersOffline: Ember.computed('accountStats.workersOffline', function() {
        return this.getWithDefault('accountStats.workersOffline', 0);
    }),

    shortHashrate: Ember.computed('accountStats.currentHashrate', function() {
        return this.getWithDefault('accountStats.currentHashrate', 0);
    }),

    longHashrate: Ember.computed('accountStats.hashrate', function() {
        return this.getWithDefault('accountStats.hashrate', 0);
    }),

    roundShares: Ember.computed('accountStats.roundShares', function() {
        return this.getWithDefault('accountStats.roundShares', 0);
    }),

    workers: Ember.computed('accountStats.workers', function() {
        return this.getWithDefault('accountStats.workers', 0);
    }),

    payments: Ember.computed('accountStats.payments', function() {
        return this.getWithDefault('accountStats.payments', []);
    }),

    paymentsTotal: Ember.computed('accountStats.paymentsTotal', function() {
        return this.getWithDefault('accountStats.paymentsTotal', 0);
    }),

    pageSize: Ember.computed('accountStats.pageSize', function() {
        return this.getWithDefault('accountStats.pageSize', 0);
    })

});


