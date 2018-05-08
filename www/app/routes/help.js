import Ember from 'ember';
import Route from '@ember/routing/route';
import EmberObject from '@ember/object';
// Specify which Mining Apps you want to show on the Help page
import EthminerMiningAppDefinition from '../constants/mining-apps/ethminer';

export default Route.extend({  
  model: function () {    
    return {
      miningApps: [        
        EmberObject.create(EthminerMiningAppDefinition)
      ]      
    };
  }
});
