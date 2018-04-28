import Ember from 'ember';
import MiningApp from '../models/mining-app';
// Specify which Mining Apps you want to show on the Help page
import EthminerMiningAppDefinition from '../constants/mining-apps/ethminer';

export default Ember.Route.extend({
  config: Ember.computed.reads('applicationController.config'),  
  
  model: function () {    
    return {
      miningApps: [        
        new MiningApp(EthminerMiningAppDefinition)
      ]
    };
  }
});
