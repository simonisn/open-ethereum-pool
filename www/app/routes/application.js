import Ember from 'ember';

export default Ember.Route.extend({
  intl: Ember.inject.service(),
  globalsService: Ember.inject.service('globals'),
  config: Ember.computed.reads('globalsService.config'), 

  beforeModel() {
    this.get('intl').setLocale('en-us');
  }
});
