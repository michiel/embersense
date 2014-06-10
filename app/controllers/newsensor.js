export default Ember.ObjectController.extend(Ember.Validations.Mixin, {
    validations: {
      name: {
        presence: true,
        length: {
          minimum: 5
        }
      }
    },
    actions: {
      submit: function() {
        var model = this.get('model');
        model.save().then(
          function() {
            this.transitionToRoute('sensor.index', model);
          }.bind(this),
          function(err) {
            console.error('Smoke me a kipper : ', err);
          }
        );
      }
    }
});
