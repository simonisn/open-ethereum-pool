import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('miningpool-stat', 'Integration | Component | miningpool stat', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{miningpool-stat}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#miningpool-stat}}
      template block text
    {{/miningpool-stat}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
