import Ember from 'ember';

export default Ember.Controller.extend({
  globalsService: Ember.inject.service('globals'),
  config: Ember.computed.reads('globalsService.config')  
});
