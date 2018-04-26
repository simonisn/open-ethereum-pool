import Ember from 'ember';
import config from '../config/environment';

export default Ember.Route.extend({
	model: function(params) {
		var url = config.APP.ApiUrl + 'api/accounts/' + params.login;
    return Ember.$.getJSON(url).then(function(data) {
      data.login = params.login;
      return Ember.Object.create(data);
    });
	},

  setupController: function(controller, model) {
    this._super(controller, model);
    this.delayedRun = Ember.run.later(this, this.refresh, 5000);
  },

  actions: {
    error(error) {
      if (error.status === 404) {
        return this.transitionTo('not-found');
      }
    },
    // Canel the timer that causes a refresh
    willTransition(transition) {
      console.log('transition from account');

      if (this.delayedRun) {
        console.log('cancel automated refresh');
        Ember.run.cancel(this.delayedRun);        
      }

      // return true so transition can occur
      return true;
    }
  }    
});
