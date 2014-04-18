export default Ember.ArrayController.extend({
    totalSensors: function() {
      return this.get('model.length');
    }.property('@each')
  });
