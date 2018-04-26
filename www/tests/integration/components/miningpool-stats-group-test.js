import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('miningpool-stats-group', 'Integration | Component | miningpool stats group', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{miningpool-stats-group}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#miningpool-stats-group}}
      template block text
    {{/miningpool-stats-group}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
