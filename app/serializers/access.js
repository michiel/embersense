export default DS.RESTSerializer.extend({
    extractArray: function(store, type, payload, requestType) {
      payload = {
        accesses: payload
      };
      return this._super(store, type, payload, requestType);
    },
    serializeIntoHash: function(hash, type, record, options) {
      Ember.merge(hash, this.serialize(record, options));
    }
  });
