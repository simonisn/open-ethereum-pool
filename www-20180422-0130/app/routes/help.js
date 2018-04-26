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
  },
  setupController: function(controller, model) {
    this._super(controller, model);
    //this.delayedRun = Ember.run.later(this, this.refresh, 5000);
	},
	
	actions: {
    // Canel the timer that causes a refresh
    willTransition(transition) {
			console.log('transition from help');

      if (this.delayedRun) {
        console.log('cancel automated refresh');
        Ember.run.cancel(this.delayedRun);
      }

      // return true so transition can occur
      return true;
    }
  }
});
