import Ember from 'ember';
import config from '../config/environment';
import MiningPoolStatModel from '../models/mining-pool-stat';

/* 

{
    "candidatesTotal": 0,
    "hashrate": 615470228,
    "immatureTotal": 0,
    "maturedTotal": 11,
    "minersTotal": 1,
    "nodes": [
      {
        "difficulty": "34030752131909",
        "height": "447026",
        "lastBeat": "1524419652",
        "name": "main"
      }
    ],
    "now": 1524419655693,
    "stats": {
      "lastBlockFound": 1524388161,
      "roundShares": 19108000000000
    }
}

*/


export default Ember.Controller.extend({    

    bestNode: Ember.computed('model.nodes', {
        get() {
            var node = null;
            this.get('model.nodes').forEach(function (n) {
                if (!node) {
                    node = n;
                }
                if (node.height < n.height) {
                    node = n;
                }
            });
            return node;
        }
    }),

    height: Ember.computed('bestnode', {
        get() {
            var node = this.get('bestNode');
            if (node) {
                return node.height;
            }
            return 0;
        }
    }),

    nextEpoch: Ember.computed('height', {
        get() {
            var epochOffset = (30000 - (this.getWithDefault('height', 1) % 30000)) * 1000 * config.APP.BlockTime;
            return Date.now() + epochOffset;
        }
    }),    

    difficulty: Ember.computed('bestnode', {
        get() {
            var node = this.get('bestNode');
            if (node) {
                return node.difficulty;
            }
            return 0;
        }
    }),

    networkHashrate: Ember.computed('difficulty', {
        get() {
            return this.getWithDefault('difficulty', 0) / config.APP.BlockTime;
        }
    }),     

    immatureTotal: Ember.computed('model.immatureTotal', 'model.candidatesTotal', {
        get() {
            return this.getWithDefault('model.immatureTotal', 0) + this.getWithDefault('model.candidatesTotal', 0);
        }
    }),

    roundVariance: Ember.computed('model.stats.roundShares', 'difficulty', {
        get() {
            var percent = this.get('model.stats.roundShares') / this.get('difficulty');
            if (!percent) {
                return 0;
            }
            return percent.toFixed(2);
        }
    }),
    


    /**
     * miningPoolStatsColumn1
     * 
     * 1 - Miners Online
     * 2 - Pool Hash Rate
     * 3 - Last Block FOund
     * 4 - Pool Fee
     * 5 - Payout Threshold     
     */

    miningPoolStatsColumn1: Ember.computed('model', {
        get() {
            var model = this.get('model');

            //{{#mining-pool-stat stat-id=miningPoolstat.id icon-class=miningPoolStat.iconClass title=miningPoolStat.title value=miningPoolStat.value}}
            function createMiningPoolStatModel(id, iconClass, title, value) {
                return  MiningPoolStatModel.create({
                    id: id,
                    iconClass: iconClass,
                    title: title,
                    value: value
                });
            }
            
            return [
                createMiningPoolStatModel(1, "fa fa-users", "Miners Online", model.minersTotal),
                createMiningPoolStatModel(2, "fa fa-tachometer", "Pool Hash Rate", model.hashrate),
                createMiningPoolStatModel(3, "fa fa-clock-o", "Last Block Found", model.stats.lastBlockFound),
                createMiningPoolStatModel(4, "a fa-money", "Pool Fee", config.APP.PoolFee),
                createMiningPoolStatModel(5, "a fa-money", "Payout Threshold", config.APP.PayoutThreshold)                
            ];
        }
    }),
    
     /**
      * minintPoolStatsColumn2
      *       
      * 6 - Network Difficulty
      * 7 - Network Hash Rate
      * 8 - Blockchain Height
      * 9 - Current Round Variance
      */

     miningPoolStatsColumn2: Ember.computed('difficulty', 'netHashRate', 'blockHeight', 'variance', {
        get() {
            //{{#mining-pool-stat stat-id=miningPoolstat.id icon-class=miningPoolStat.iconClass title=miningPoolStat.title value=miningPoolStat.value}}
            function createMiningPoolStatModel(id, iconClass, title, value) {
                return  MiningPoolStatModel.create({
                    id: id,
                    iconClass: iconClass,
                    title: title,
                    value: value
                });
            }

            var difficulty = this.get('difficulty'),
                netHashRate = this.get('netHashRate'),
                blockHeight = this.get('blockHeight'),
                variance = this.get('variance');

            return [
                createMiningPoolStatModel(6, "fa fa-unlock-alt", "Network Difficulty", difficulty),
                createMiningPoolStatModel(7, "fa fa-tachometer", "Network Hash Rate", netHashRate),
                createMiningPoolStatModel(8, "fa fa-bars", "Blockchain Height", blockHeight),
                createMiningPoolStatModel(9, "fa fa-clock-o", "Round Variance", variance)
            ];
        }
    })

});
