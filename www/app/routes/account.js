import Ember from 'ember';

export default Ember.Route.extend({
  globalsService: Ember.inject.service('globals'),
  config: Ember.computed.reads('globalsService.config'), 
  
  model: function (params) {
    var url = this.get('config').ApiUrl + 'api/accounts/' + params.login;
    
    return Ember.$.getJSON(url).then(function (data) {
      data.login = params.login;
      return Ember.Object.create(data);
    });
  },

  setupController: function (controller, model) {
    this._super(controller, model);
    Ember.run.later(this, this.refresh, this.get('config').APIRefreshRate.minerStats);
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
