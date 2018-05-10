import Ember from 'ember';
import Controller from '@ember/controller';
import EmberObject, { computed } from '@ember/object';
import $ from 'jquery';
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

        // Close the navbar menu when an list item is clicked
        $(document).ready(function() {
            $('#application-navbar>.navbar-nav>li>a').on('click', function(){
                $('#application-navbar').collapse('hide');
            });
        });        

        // Inject open-iconic SVG 
        var mySVGsToInject = document.querySelectorAll('.iconic-sprite');        
        svgInjector(mySVGsToInject);        

        this.get('poolStatsService').start();        
    },

    willDestroy() {
        this.get('poolStatsService').stop();
    }    
});
