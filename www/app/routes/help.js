import Ember from 'ember';
import MiningApp from '../models/miningapp';
import miningapps from '../constants/miningapps';

export default Ember.Route.extend({
  model: function () {
    return {
      miningapps: miningapps.apps.map(function (m) {
        return new MiningApp(m);
      })
    };
  },

  setupController: function (controller, model) {
    this._super(controller, model);    
  }
});
