import Ember from 'ember';

export default Ember.Route.extend({
  globalsService: Ember.inject.service('globals'),
  config: Ember.computed.reads('globalsService.config'), 

  historicalStatsService: Ember.inject.service('historical-stats'),  
  accountStatsService: Ember.inject.service('account-stats'),

  afterModel(resolvedModel) {
    // Get the login from the resolvedModel
    //var login = resolvedModel.login;

    //this.get('historicalStatsService').start(login);
    //this.get('accountStatsService').start(login);

    this._super(...arguments);
  },

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
