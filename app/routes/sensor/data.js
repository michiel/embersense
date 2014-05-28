export default Ember.Route.extend(Ember.SimpleAuth.AuthenticatedRouteMixin, {
    queryParams: {
      star_tdate : {
        refreshModel : true
      },
      end_date : {
        refreshModel : true
      }
    },
    model: function(params) {
      return this.store.findQuery('/sensors/:sensor_id/data', params);
    }
});
