var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances

Router.map(function() {
  this.route('login');
  this.route('component-test');
  this.route('helper-test');
  this.resource('sensors', function() {
  //   this.route('new');
  });
});

export default Router;
