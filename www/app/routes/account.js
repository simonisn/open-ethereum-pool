import Ember from 'ember';
import Route from '@ember/routing/route';
import EmberObject, { computed } from '@ember/object';

export default Route.extend({
  historicalStatsService: Ember.inject.service('historical-stats'),  
  accountStatsService: Ember.inject.service('account-stats'),

  model: function (params) {  
    var login = params.login;

    // TODO: Add promise to wait for initial accountStats load before returning    
    this.get('historicalStatsService').start(login);
    this.get('accountStatsService').start(login);

    var owner = Ember.getOwner(this),
        model = owner.lookup('object:account-stats');

    return model;
  },  

  deactivate() {
    // Stop the historical stats service
    this.get('historicalStatsService').stop();
    this.get('accountStatsService').stop();
    
    this._super(...arguments);
  },  

  actions: {    
    error(error) {
      if (error.status === 404) {
        return this.transitionTo('account-not-found');
      } else {
        return true;
      }
    }
  }
});
