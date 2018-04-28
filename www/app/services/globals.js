import Ember from 'ember';
import envConfig from '../config/environment';

export default Ember.Service.extend({
    config: Ember.Object.create(envConfig.APP)
});

