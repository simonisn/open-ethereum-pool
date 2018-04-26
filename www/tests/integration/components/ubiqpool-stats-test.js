import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ubiqpool-stats', 'Integration | Component | ubiqpool stats', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ubiqpool-stats}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ubiqpool-stats}}
      template block text
    {{/ubiqpool-stats}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
