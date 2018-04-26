import Ember from 'ember';

export default Ember.Controller.extend({  
  needs: "mining-pool-stats",
  miningPoolStatsController: Ember.computed.alias("controllers"),

  roundPercent: Ember.computed('model', {
    get() {
      var percent = this.get('model.roundShares') / this.get('miningPoolStatsController.stats.roundShares');
      if (!percent) {
        return 0;
      }
      return percent;
    }
  })
});
