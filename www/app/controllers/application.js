import Ember from 'ember';
import Controller from '@ember/controller';
import EmberObject, { computed } from '@ember/object';
import config from '../config/environment';
import svgInjector from 'svg-injector';

export default Controller.extend({    
    config: config.APP,

    poolStatsService: Ember.inject.service('pool-stats'),
    
    poolStats: computed(function() {
        var owner = Ember.getOwner(this);    
        var poolStats = owner.lookup('object:pool-stats');        
        
        return poolStats;
    }),

    networkStats: computed(function() {
        var owner = Ember.getOwner(this);    
        var networkStats = owner.lookup('object:network-stats');        
        
        return networkStats;
    }),
    
    init() {
        this._super(...arguments);

        // Elements to inject
        var mySVGsToInject = document.querySelectorAll('.iconic-sprite');

        // Do the injection
        svgInjector(mySVGsToInject);        

        this.get('poolStatsService').start();        
    },

    willDestroy() {
        this.get('poolStatsService').stop();
    }    
});
