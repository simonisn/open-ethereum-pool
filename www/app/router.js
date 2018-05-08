import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('account', { path: '/account/:login' });

  this.route('account-not-found');

  this.route('blocks');

  this.route('payments');
  this.route('miners');
  this.route('help');
  this.route('about');

  this.route('not-found', {path: "/*path" });
  this.route('test');
});

export default Router;
