import Ember from 'ember';
import config from '../config/environment';
import PoolStatsModel from '../models/pool-stats';

export default Ember.Service.extend({
    model: PoolStatsModel.create(),

    _runTimer: null,

    getModel() {
        var model = this.get('model');

        console.log('getting service.model', model);

        return model;
    },

    setModel(model) {
        console.log('setting service.model', model);

        this.set('model', model);
    },

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

        Ember.$.getJSON(config.APP.ApiUrl + 'api/stats').then(function(data) {
            var model = that.getModel();

            console.log('service.model', model);            
            
            that.setModel(PoolStatsModel.create(data));

            // TODO: Update Model Properties instead of replacing the object.  Will thie automatically update component data?
            
            //model.setProperties(data);            

            that.set('_runTimer', Ember.run.later(that, that.loadStats, config.APP.StatsRefreshRate));
        });
    },

    willDestroy() {
        this.stop();
    }
});