export default Ember.ObjectController.extend({

    isMine: function() {
      this.get('model').get('requester.id') === this.get('session.id');;
    }.property('isMine'),

    actions : {
      revoke : function() {
        var model = this.get('model');
        model.set('status', 'revoked');
        model.save();
      },
      reject : function() {
        var model = this.get('model');
        model.set('status', 'rejected');
        model.save();
      },
      withdraw : function() {
        var model = this.get('model');
        model.set('status', 'withdrawn');
        model.save();
      },
      accept : function() {
        var model = this.get('model');
        model.set('status', 'accepted');
        model.save();
      }
    }

  });
