import Ember from 'ember';
import Payment from "../models/payment";

export default Ember.Route.extend({
	globalsService: Ember.inject.service('globals'),
    config: Ember.computed.reads('globalsService.config'), 

	model: function() {
		var url = this.get('config').ApiUrl + 'api/payments';
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
    this.delayedRun = Ember.run.later(this, this.refresh, this.get('config').APIRefreshRate.payments);
	}
});
