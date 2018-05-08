import Ember from 'ember';
import Service from '@ember/service';
import EmberObject, { computed } from '@ember/object';
import config from '../config/environment';

export default Service.extend({    
    _login: '',
    _runTimer: null,    
    _isRunning: computed('_runTimer', function() {
        return (this.get('_runTimer') !== null);
    }),    

    stats: null,
    
    statsInterval: computed('stats', function() {
        return this.get('stats').statsInterval;        
    }),

    statsRetention: computed('stats', function() {
        return this.get('stats').statsRetention;
    }),

    init() {
        this._super(arguments);
    },

    start(login) {
        // Start, only when Set the login has changed
        var currentLogin = this.get('_login');
        
        if (login !== currentLogin) {
            // Clear the current Historical Stats
            this.set('stats', {});

            // Update the Login
            this.set('_login', login);

            // If the service is already running
            if (this.get('_isRunning') === true) {                   
                // Cancel and clear the current runTimer
                Ember.run.cancel(this.get('_runTimer'));
                this.set('_runTimer', null);
            }

            // Exceute Load Stats run loop
            this._loadStats();
        }
    },

    stop() {
        if (this.get('_isRunning') === true) {
            var runTimer = this.get('_runTimer');
            
            if (runTimer !== null) {
                Ember.run.cancel(runTimer);
                this.set('_runTimer', null);
            }
        }        
    },     

    _loadStats() {
        var that = this,
            login = this.get('_login');    
        
        Ember.$.getJSON(config.APP.ApiUrl + 'api/historical/' + login).then(
            function(data) {
                // Handle Resolve
                that.set('stats', data);
                that.set('_runTimer', Ember.run.later(that, that._loadStats, config.APP.APIRefreshRate.historical));
            }, function() {
                // Handle Reject
                console.error('Historical Stats Service: Loading Stats Failed.', 'Login not provided');  
            });    
    },
   
    willDestroy() {
        this.stop();
    }
});