export default Ember.ArrayController.extend({
    totalShares: function() {
      return this.get('model.length');
    }.property('@each')
  });

