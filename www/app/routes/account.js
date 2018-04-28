import Ember from 'ember';

export default Ember.Route.extend({
  config: Ember.computed.reads('globals.config'),  

  model: function (params) {
    var url = this.get('config').ApiUrl + 'api/accounts/' + params.login;
    
    return Ember.$.getJSON(url).then(function (data) {
      data.login = params.login;
      return Ember.Object.create(data);
    });
  },

  setupController: function (controller, model) {
    this._super(controller, model);
    this.delayedRun = Ember.run.later(this, this.refresh, 5000);
  },

  actions: {
    error(error) {
      if (error.status === 404) {
        return this.transitionTo('not-found');
      }
    }
  }
});
