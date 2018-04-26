import Ember from 'ember';
import Block from "../models/block";
import config from '../config/environment';

export default Ember.Route.extend({
	model: function() {
    var url = config.APP.ApiUrl + 'api/blocks';
    return Ember.$.getJSON(url).then(function(data) {
			if (data.candidates) {
				data.candidates = data.candidates.map(function(b) {
					return Block.create(b);
				});
			}
			if (data.immature) {
				data.immature = data.immature.map(function(b) {
					return Block.create(b);
				});
			}
			if (data.matured) {
				data.matured = data.matured.map(function(b) {
					return Block.create(b);
				});
			}
			return data;
    });
	},

  setupController: function(controller, model) {
    this._super(controller, model);
    this.delayedRun = Ember.run.later(this, this.refresh, 5000);
	},
	
	actions: {
    // Canel the timer that causes a refresh
    willTransition(transition) {
			console.log('transition from blocks');

      if (this.delayedRun) {
				console.log('cancel automated refresh');
        Ember.run.cancel(this.delayedRun);
      }

      // return true so transition can occur
      return true;
    }
  }
});
