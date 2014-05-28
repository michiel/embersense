export default Ember.ObjectController.extend(Ember.Validations.Mixin, {
    validations: {
      name: {
        presence: true,
        length: {
          minimum: 5
        }
      }
    }
    actions: {
      submit: function() {
        alert('Saved!');
      }
    }
});
