import Ember from 'ember';
import Controller from '@ember/controller';
import EmberObject, {computed} from '@ember/object';
import config from '../config/environment';

export default Controller.extend({
  config: config,
  
	cachedLogin: computed('login', {
    get() {
      return this.get('login') || document.cookie.login;
    },
    set(key, value) {
      document.cookie.login = value;
      this.set('model.login', value);
      return value;
    }
  })  
});
