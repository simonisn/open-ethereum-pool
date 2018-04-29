import Ember from 'ember';

export default Ember.Route.extend({
    globalsService: Ember.inject.service('globals'),
    config: Ember.computed.reads('globalsService.config')

});
