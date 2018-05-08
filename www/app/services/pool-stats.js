import Ember from 'ember';
import Service from '@ember/service';
import EmberObject, { computed } from '@ember/object';
import config from '../config/environment';

export default Service.extend({
    poolStats: {},
    networkStats: {},

    _runTimer: null,      

    init() {
        this._super(arguments);
    },    

    start() {
        return this.loadStats();
    },

    stop() {
        Ember.Run.cancel(this.get('_runTimer'));
        this.set('_runTimer', null);
    },

    loadStats() {
        var that = this;

        return Ember.$.getJSON(config.APP.ApiUrl + 'api/stats').then(function(data) {
            that.parseStats(data);

            that.set('_runTimer', Ember.run.later(that, that.loadStats, config.APP.APIRefreshRate.poolStats));
        });
    },

    parseStats(data) {
        // Create PoolStats and NetworkStats data structures
        // set poolStats and networkStats with new models from the data structures

        var owner,
            parser,
            poolStats,
            networkStats;

        owner = Ember.getOwner(this);
        parser = owner.lookup('object:pool-stats-parser');

        parser.set('data', data);

        poolStats = parser.get('poolStats');
        networkStats = parser.get('networkStats');

        this.set('poolStats', poolStats);
        this.set('networkStats', networkStats);
    },

    willDestroy() {
        this.stop();
    }
});