import Ember from 'ember';

export default Ember.Service.extend({
    globals: Ember.inject.service('globals'),
    config: Ember.computed.reads('globals.config'),  
    
    _login: '',
    _runTimer: null,    
    _isRunning: Ember.computed('_runTimer', function() {
        return (this.get('_runTimer') !== null);
    }),    

    accountStats: {}, 

    init() {
        this._super(arguments);
    },

    start(login) {
        // Start, only when Set the login has changed
        var currentLogin = this.get('_login');
        
        if (login !== currentLogin) {
            // Clear the current Historical Stats
            this.set('accountStats', {});

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
        
        Ember.$.getJSON(that.get('config').ApiUrl + 'api/accounts/' + login).then(
            function(data) {
                console.log('AccountStats Service: data', data);

                data.login = login;

                // Handle Resolve
                that.set('accountStats', data);
                that.set('_runTimer', Ember.run.later(that, that._loadStats, that.get('config').APIRefreshRate.minerStats));
            }, function(error) {
                // Handle Reject
                console.error('Account Stats Service: Loading Stats Failed.', error);  
            });    
    },
   
    willDestroy() {
        this.stop();
    }
});