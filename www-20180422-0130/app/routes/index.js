import Ember from 'ember';

export default Ember.Route.extend({

  actions: {
    lookup(login) {
      if (!Ember.isEmpty(login)) {
        return this.transitionTo('account', login);
      }
    },

    // Canel the timer that causes a refresh
    willTransition(transition) {
      console.log('transition from index');    

      // return true so transition can occur
      return true;
    }
  }  
});
