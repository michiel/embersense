export default Ember.ArrayController.extend({
    totalDataPoints: function() {
      return this.get('model.length');
    }.property('@each')
  });

