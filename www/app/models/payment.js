import Ember from 'ember';
import EmberObject, { computed } from '@ember/object';

export default EmberObject.extend({
	formatAmount: computed('amount', function() {
		var value = parseInt(this.get('amount')) * 0.000000001;
		return value.toFixed(8);
	})
});


