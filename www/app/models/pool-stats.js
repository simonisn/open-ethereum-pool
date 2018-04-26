import Ember from 'ember';
import config from '../config/environment';

export default Ember.Object.extend({        

    payoutThreshold: config.APP.PayoutThreshold,    
    
    poolFee: config.APP.PoolFee,

    /**
     * Add Computed Properties based on values from the loaded model
     */
    bestNode: Ember.computed('nodes', function() {
        console.debug('Computing bestNode');

        var node = null,
            nodes;

        nodes = this.get('nodes');
        
        if (nodes) {
            nodes.forEach(function (n) {
                if (!node) {
                    node = n;
                }
                if (node.height < n.height) {
                    node = n;
                }
            });
        }

        console.debug('bestNode', node);

        return node;
    }),

    height: Ember.computed('bestNode', function() {     
        console.debug('Computing height');
        
        var height = 0,
            node = this.get('bestNode');

        if (node) {
            height = node.height;
        }

        console.debug('height', height);

        return height;
    }),

    nextEpoch: Ember.computed('height', function() {    
        console.debug('Computing nextEpoch');    

        var epochOffset = (30000 - (this.getWithDefault('height', 1) % 30000)) * 1000 * config.APP.BlockTime;
        var epochDate = Date.now() + epochOffset;     
        
        console.debug('epochDate', epochDate);

        return epochDate;
    }),    

    difficulty: Ember.computed('bestNode', function() {
        console.debug('Computing difficulty');    

        var difficulty = 0,
            node = this.get('bestNode');

        if (node) {
            difficulty = node.difficulty;
        }

        console.debug('difficulty', difficulty);    

        return difficulty;
    }),

    networkHashrate: Ember.computed('difficulty', function() {
        console.debug('Computing networkHashrate');    

        var networkHashRate = 0;
        
        networkHashRate = this.getWithDefault('difficulty', 0) / config.APP.BlockTime;        

        console.debug('networkHashrate', networkHashRate);    

        return networkHashRate;
    }),     

    newBlocksTotal: Ember.computed('immatureTotal', 'candidatesTotal', function() {
        return this.getWithDefault('immatureTotal', 0) + this.getWithDefault('candidatesTotal', 0);        
    }),

    roundVariance: Ember.computed('stats.roundShares', 'difficulty', function() {        
        var percent = this.get('stats.roundShares') / this.get('difficulty');
        if (!percent) {
            return 0;
        }
        return percent.toFixed(2);        
    })
});