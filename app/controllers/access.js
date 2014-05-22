export default Ember.ObjectController.extend({

    isMine: function() {
      return this.get('model.requester.email') === this.get('session.email');
    }.property('model'),

    isAccepted: function() {
      return this.get('status') === 'accepted';
    },

    isActive: function() {
      return !this.get('isInactive');
    }.property('isInactive'),

    isInactive: function() {
      var status = this.get('model.status');
      return (status === 'withdrawn') || (status === 'revoked') || (status === 'revoked');
    }.property('model'),

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
