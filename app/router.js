var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances

Router.map(function() {
  this.route('about');
  this.route('login');
  this.route('component-test');
  this.route('helper-test');
  this.resource('sensors', function() {
      this.resource('sensor', { path:'/:sensor_id' }, function() {
          this.route('edit');
        });
    // this.route('create');
  });
});

export default Router;
