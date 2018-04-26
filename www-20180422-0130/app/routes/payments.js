import Ember from 'ember';
import Payment from "../models/payment";
import config from '../config/environment';

export default Ember.Route.extend({
	model: function() {
    var url = config.APP.ApiUrl + 'api/payments';
    return Ember.$.getJSON(url).then(function(data) {
			if (data.payments) {
				data.payments = data.payments.map(function(p) {
					return Payment.create(p);
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
      console.log('transition from payments');

      if (this.delayedRun) {
        console.log('cancel automated refresh');
        Ember.run.cancel(this.delayedRun);
      }

      // return true so transition can occur
      return true;
    }
  }
});
