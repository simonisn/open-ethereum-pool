import Component from '@ember/component';

export default Component.extend({
  tagName: 'svg',
  classNames:  ['icon'],
  attributeBindings: ['viewbox'],
  viewbox: "0 0 24 24"
});