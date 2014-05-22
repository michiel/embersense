export default Ember.ObjectController.extend({

    actions : {
      revoke : function() {
        var model = this.get('model');
        model.set('status', 'revoked');
        model.save();
      },
      accept : function() {
        var model = this.get('model');
        model.set('status', 'accepted');
        model.save();
      },
      cancel : function() {
        var model = this.get('model');
        model.set('status', 'cancelled');
        model.save();
      }
    }

  });
