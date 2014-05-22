var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances

Router.map(function() {
  this.route('about');
  this.route('login');
  this.resource('sensors', function() {
      this.resource('sensor', { path:'/:sensor_id' }, 
        function() {
          this.resource('sensordata', {
              path: '/data/:data_id'
            });
        });
  });
  this.resource('accesses', function() {
      this.resource('access', { path:'/:access_id' });
  });
});

export default Router;
