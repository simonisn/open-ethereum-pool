import Ember from 'ember';
import config from '../config/environment';

export default Ember.Route.extend({
  intl: Ember.inject.service(),

  beforeModel() {
    this.get('intl').setLocale('en-us');
  },

	model: function() {
    var url = config.APP.ApiUrl + 'api/stats';
    return Ember.$.getJSON(url).then(function(data) {
      return Ember.Object.create(data);
    });
	},

  setupController: function(controller, model) {
    this._super(controller, model);
    this.delayedRun = Ember.run.later(this, this.refresh, 5000);
  },

  actions: {
    // Canel the timer that causes a refresh
    willTransition(transition) {
      console.log('transition from application');

      if (this.delayedRun) {
        console.log('cancel automated refresh');
        Ember.run.cancel(this.delayedRun);
      }

      // return true so transition can occur
      return true;
    }
  }
});
