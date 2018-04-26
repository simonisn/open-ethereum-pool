import Ember from 'ember';
import MiningApp from '../models/mining-app';
// Specify which Mining Apps you want to show on the Help page
import ExampleMiningAppDefinition from '../constants/mining-apps/example';
import EthminerMiningAppDefinition from '../constants/mining-apps/ethminer';

export default Ember.Route.extend({
  model: function () {    
    return {
      miningApps: [
        new MiningApp(ExampleMiningAppDefinition),
        new MiningApp(EthminerMiningAppDefinition)
      ]
    };
  }
});
