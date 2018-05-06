import Ember from 'ember';

export default Ember.Route.extend({
  globalsService: Ember.inject.service('globals'),
  config: Ember.computed.reads('globalsService.config'), 

  historicalStatsService: Ember.inject.service('historical-stats'),  
  //chartBuilderService: Ember.inject.service('chart-builder'),  
  
  afterModel(resolvedModel) {
    // Get the login from the resolvedModel
    var login = resolvedModel.login;

    this.get('historicalStatsService').start(login);

    this._super(...arguments);
  },

  deactivate() {
    // Stop the historical stats service
    this.get('historicalStatsService').stop();
    
    this._super(...arguments);
  },

  model: function (params) {    

    var url = this.get('config').ApiUrl + 'api/accounts/' + params.login;
    
    return Ember.$.getJSON(url).then(function (data) {
      data.login = params.login;
      
      return Ember.Object.create(data);
    });
  },

  setupController: function (controller, model) {
    this._super(controller, model);
    //Ember.run.later(this, this.refresh, this.get('config').APIRefreshRate.minerStats);
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
