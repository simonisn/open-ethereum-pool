import Ember from 'ember';

// Specify which Mining Apps you want to show on the Help page
import EthminerMiningAppDefinition from '../constants/mining-apps/ethminer';

export default Ember.Route.extend({  
  globalsService: Ember.inject.service('globals'),
  config: Ember.computed.reads('globalsService.config'), 

  model: function () {    
    return {
      miningApps: [        
        Ember.Object.create(EthminerMiningAppDefinition)
      ]
    };
  }
});
