export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('sensor', params.sensor_id);
  }
});
