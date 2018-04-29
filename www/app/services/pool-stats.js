import Ember from 'ember';

export default Ember.Service.extend({
    globals: Ember.inject.service('globals'),
    config: Ember.computed.reads('globals.config'),  

    poolStats: null,
    networkStats: null,

    getStats() {
        return this.get('stats');
    },

    _runTimer: null,      

    init() {
        this._super(arguments);                
    },    

    start() {
        this.loadStats();
    },

    stop() {
        Ember.Run.cancel(this.get('_runTimer'));
        this.set('_runTimer', null);
    },

    loadStats() {
        var that = this;

        Ember.$.getJSON(that.get('config').ApiUrl + 'api/stats').then(function(data) {
            that.parseStats(data);

            that.set('_runTimer', Ember.run.later(that, that.loadStats, that.get('config').StatsRefreshRate));
        });
    },

    parseStats(data) {
        // Create PoolStats and NetworkStats data structures
        // set poolStats and networkStats with new models from the data structures

        var parser,
            poolStats,
            networkStats;

        var owner = Ember.getOwner(this);
        var parser = owner.lookup('object:pool-stats-parser');

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