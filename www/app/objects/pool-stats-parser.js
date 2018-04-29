import Ember from 'ember';

export default Ember.Object.extend({
    globals: Ember.inject.service('globals'),
    config: Ember.computed.reads('globals.config'),  
    
    data: null,            

    bestNode: Ember.computed('data.nodes', function() {
        console.debug('Computing bestNode');

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

        console.debug('bestNode', node);

        return node;           
    }),

    blockchainHeight: Ember.computed('bestNode', function() {     
        console.debug('Computing blockchainHeight');
        
        var height = 0,
            node = this.get('bestNode');

        if (node) {
            height = node.height;
        }

        console.debug('blockchainHeight', height);

        return height;
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

    networkHashrate: Ember.computed('difficulty', 'config.BlockTime', function() {        
        console.debug('Computing networkHashrate');    

        var networkHashRate = 0;
        
        networkHashRate = this.getWithDefault('difficulty', 0) / this.getWithDefault('config.BlockTime', 1);

        console.debug('networkHashrate', networkHashRate);    

        return networkHashRate;                    
    }),

    epochDate: Ember.computed('blockChainHeight', 'config.BlockTime', 'config.EpochBlockCount', function() {
        console.debug('Computing nextEpoch');

        var blockChainHeight = this.get('blockChainHeight'),
            blockTime = this.get('config.BlockTime'),
            epochBlockCount = this.get('config.EpochBlockCount'),
            epochOffset,
            epochDate;

        epochOffset = (epochBlockCount - (blockChainHeight % epochBlockCount)) * 1000 * blockTime;
        epochDate = Date.now() + epochOffset;     
        
        console.debug('epochDate', epochDate);

        return epochDate;            
    }),   
    
    newBlocks: Ember.computed('data.immatureTotal', 'data.candidatesTotal', function() {
        return this.get('data.immatureTotal') + this.get('data.candidatesTotal');
    }),

    roundVariance: Ember.computed('difficulty', 'data.stats.roundShares', function() {        
        console.debug('Computing roundVariance');    

        var percent = this.get('data.stats.roundShares') / this.getWithDefault('difficulty', 1);

        if (!percent) {
            percent = 0;
        }

        console.debug('roundVariance', percent);    

        return percent.toFixed(2);                            
    }),

    poolStats: Ember.computed('config.PayoutThreshold', 'config.PoolFee', 'data.minersTotal', 'data.hashrate', 'data.stats.lastBlockFound', 'data.stats.roundShares', 'roundVariance', 'newBlocks', function() {
        return {
            payoutThreshold: this.get('config.PayoutThreshold'),
            poolFee: this.get('config.PoolFee'),
            minersOnline: this.get('data.minersTotal'),
            hashrate: this.get('data.hashrate'),
            lastBlockFound: this.get('data.stats.lastBlockFound'),
            newBlocks: this.get('newBlocks'),
            roundShares: this.get('data.stats.roundShares'),
            roundVariance: this.get('roundVariance')
        };
    }),

    networkStats: Ember.computed('difficulty', 'networkHashrate', 'blockchainHeight', 'epochDate', function() {
        return {
            difficulty: this.get('difficulty'),
            hashrate: this.get('networkHashrate'),
            blockchainHeight: this.get('blockchainHeight'),
            epochDate: this.get('epochDate')
        };
    })
});