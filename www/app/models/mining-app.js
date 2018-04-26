import Ember from 'ember';
import config from '../config/environment';

var MiningApp = Ember.Object.extend({
    init: function (miningApp) {
        this._super(miningApp);        
        
        console.log('miningApp.runtime.example: ', miningApp.runtime.example);

        if (miningApp.runtime && miningApp.runtime.example) {
            this.set('runtime.example', miningApp.runtime.example.replace(/\[STRATUMHOST\]/gi, config.APP.StratumHost));
            this.set('runtime.example', miningApp.runtime.example.replace(/\[STRATUMPORT\]/gi, config.APP.StratumPort));
            this.set('runtime.example', miningApp.runtime.example.replace(/\[HTTPHOST\]/gi, config.APP.HttpHost));
            this.set('runtime.example', miningApp.runtime.example.replace(/\[HTTPPORT\]/gi, config.APP.HttpPort));            
        }

        console.log('runtime.example: ', this.get('runtime.example'));
    }    
});

export default MiningApp;
