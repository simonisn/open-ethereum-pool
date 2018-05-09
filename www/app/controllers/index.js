import Ember from 'ember';
import Controller from '@ember/controller';
import EmberObject, {computed} from '@ember/object';
import Cookies from 'ember-cli-js-cookie';
import config from '../config/environment';

export default Controller.extend({
  config: config.APP,

  logger: Ember.inject.service(),
  
	cachedLogin: computed({
    get() {
      var login = Cookies.get('login');
      this.get('logger').info('login', login);
      return login;
    },
    set(key, value) {
      this.get('logger').info('set login', value);
      Cookies.set('login', value);            
      return value;
    }
  })  
});
