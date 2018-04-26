import Ember from 'ember';
import MiningPoolStatsModel from "../models/mining-pool-stats";
import config from '../config/environment';

/* 

{
    "candidatesTotal": 0,
    "hashrate": 615470228,
    "immatureTotal": 0,
    "maturedTotal": 11,
    "minersTotal": 1,
    "nodes": [
      {
        "difficulty": "34030752131909",
        "height": "447026",
        "lastBeat": "1524419652",
        "name": "main"
      }
    ],
    "now": 1524419655693,
    "stats": {
      "lastBlockFound": 1524388161,
      "roundShares": 19108000000000
    }
}

*/

export default Ember.Route.extend({
    model: function () {
        console.log('Loading mining-pool-stats model');

        return Ember.$.getJSON(config.APP.ApiUrl + 'api/stats').then(function (data) {
            console.log('mining-pool-stats model', data);
            return MiningPoolStatsModel.create(data);
        });
    },

    // Force the model to reload every 5 seconds 
    // TODO:  Add a configuration option for the refresh rate
    setupController: function (controller, model) {
        this._super(controller, model);
        this.delayedRun = Ember.run.later(this, this.refresh, 5000);
    }
});
