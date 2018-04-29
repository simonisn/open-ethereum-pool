import Ember from 'ember';

export default Ember.Route.extend({
    globalsService: Ember.inject.service('globals'),
    config: Ember.computed.reads('globalsService.config'),

    redirect: function () {
        var url = this.router.location.formatURL('/not-found');
        if (window.location.pathname !== url) {
            this.transitionTo('/not-found');
        }
    }	
});
