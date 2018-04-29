import Ember from 'ember';

export default Ember.Component.extend({
    globalsService: Ember.inject.service('globals'),
    config: Ember.computed.reads('globalsService.config'),  

    init() {
        this._super(...arguments);        

        var example = this.get('miningApp.runtime.example'),
            config = this.get('config');

        if (example) {
            example = example.replace(/\[STRATUMHOST\]/gi, config.StratumHost);
            example = example.replace(/\[STRATUMPORT\]/gi, config.StratumPort);
            example = example.replace(/\[HTTPHOST\]/gi, config.HttpHost);
            example = example.replace(/\[HTTPPORT\]/gi, config.HttpPort);

            this.set('miningApp.runtime.example', example);
        }        
    }
});