import Ember from 'ember';

export default Ember.Controller.extend({
  config: Ember.computed.reads('globals.config')  ,

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
