export default DS.Transform.extend({
    serialize: function(obj) {
      return Ember.isEmpty(obj) ? null : {
        id    : obj.get('id'),
        name  : obj.get('name'),
        email : obj.get('email')
      };
    },
    deserialize: function(obj) {
      return Ember.create({
          id    : obj.id,
          name  : obj.name,
          email : obj.email
        });
    }
  });
