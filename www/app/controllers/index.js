import Ember from 'ember';

export default Ember.Controller.extend({
  globalsService: Ember.inject.service('globals'),
  config: Ember.computed.reads('globalsService.config'),

	cachedLogin: Ember.computed('login', {
    get() {
      return this.get('login') || Ember.$.cookie('login');
    },
    set(key, value) {
      Ember.$.cookie('login', value);
      this.set('model.login', value);
      return value;
    }
  })  
});
