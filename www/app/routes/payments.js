import Ember from 'ember';
import Route from '@ember/routing/route'
import config from '../config/environment';

import Payment from "../models/payment";

export default Route.extend({
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
    this.delayedRun = Ember.run.later(this, this.refresh, config.APP.APIRefreshRate.payments);
	}
});
