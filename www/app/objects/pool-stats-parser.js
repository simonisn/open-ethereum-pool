import Ember from 'ember';
import EmberObject, { computed } from '@ember/object';
import config from '../config/environment';

export default Ember.Object.extend({    
    data: null,            

    bestNode: computed('data.nodes', function() {
        var node = null,
            nodes = this.get('data.nodes');
        
        if (nodes) {
            nodes.forEach(function (n) {
                if (!node) {
                    node = n;
                } else if (n.height > node.height) {
                    node = n;
                }
            });
        }

        return node;           
    }),

    blockchainHeight: computed('bestNode', function() {     
        var height = 0,
            node = this.get('bestNode');

        if (node) {
            height = node.height;
        }

        return height;
    }),

    difficulty: computed('bestNode', function() {
        var difficulty = 0,
            node = this.get('bestNode');

        if (node) {
            difficulty = node.difficulty;
        }

        return difficulty;
    }),    

    networkHashrate: computed('difficulty', function() {        
        var networkHashRate = 0;
        
        networkHashRate = this.getWithDefault('difficulty', 0) / config.APP.BlockTime;

        return networkHashRate;                    
    }),

    epochDate: computed('blockchainHeight', function() {
        var blockchainHeight = this.get('blockchainHeight'),
            blockTime = config.APP.BlockTime,
            epochBlockCount = config.APP.EpochBlockCount,
            epochOffset,
            epochDate;
        
        epochOffset = (epochBlockCount - (blockchainHeight % epochBlockCount)) * 1000 * blockTime;
        epochDate = Date.now() + epochOffset;     

        return epochDate;            
    }),   
    
    newBlocks: computed('data.immatureTotal', 'data.candidatesTotal', function() {
        return this.get('data.immatureTotal') + this.get('data.candidatesTotal');
    }),

    roundVariance: computed('difficulty', 'data.stats.roundShares', function() {        
        var percent = this.get('data.stats.roundShares') / this.getWithDefault('difficulty', 1);

        if (!percent) {
            percent = 0;
        }

        return percent.toFixed(2);                            
    }),

    poolStats: computed('data.minersTotal', 'data.hashrate', 'data.stats.lastBlockFound', 'data.stats.roundShares', 'roundVariance', 'newBlocks', function() {
        return {
            payoutThreshold: config.APP.PayoutThreshold,
            poolFee: config.APP.PoolFee,
            minersOnline: this.getWithDefault('data.minersTotal', 0),
            hashrate: this.getWithDefault('data.hashrate', 0),
            lastBlockFound: this.getWithDefault('data.stats.lastBlockFound', 0),
            newBlocks: this.getWithDefault('newBlocks', 0),
            roundShares: this.getWithDefault('data.stats.roundShares', 0),
            roundVariance: this.getWithDefault('roundVariance', 0)
        };
    }),

    networkStats: Ember.computed('difficulty', 'networkHashrate', 'blockchainHeight', 'epochDate', function() {
        return {
            difficulty: this.getWithDefault('difficulty', 0),
            hashrate: this.getWithDefault('networkHashrate', 0),
            blockchainHeight: this.getWithDefault('blockchainHeight', 0),
            epochDate: this.getWithDefault('epochDate', 0)
        };
    })
});