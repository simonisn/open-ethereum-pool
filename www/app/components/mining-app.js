import Ember from 'ember';
import Component from '@ember/component';
import config from '../config/environment';

export default Component.extend({    
    init() {
        this._super(...arguments);        

        var example = this.get('miningApp.runtime.example')            

        if (example) {
            example = example.replace(/\[STRATUMHOST\]/gi, config.APP.StratumHost);
            example = example.replace(/\[STRATUMPORT\]/gi, config.APP.StratumPort);
            example = example.replace(/\[HTTPHOST\]/gi, config.APP.HttpHost);
            example = example.replace(/\[HTTPPORT\]/gi, config.APP.HttpPort);

            this.set('miningApp.runtime.example', example);
        }        
    }
});