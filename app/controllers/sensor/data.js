export default Ember.ArrayController.extend({
    queryParams : ['start_date', 'end_date', 'per_page', 'page', 'sort'],
    start_date  : null,
    end_date    : null,
    per_page    : 1,
    page        : 0,
    sort        : 'DESC', // 'ASC'

    rangeOfData : function() {

      var dataPoints = this.get('model');

      var start_date = this.get('start_date');
      var end_date   = this.get('end_date');
      var per_page   = this.get('per_page');
      var page       = this.get('page');
      var sort       = this.get('sort');

      return datePoints.filterProperty('start_date', start_date);

    }.property('start_date', 'end_date', 'per_page', 'page', 'sort', 'model'),

    totalDataPoints: function() {
      return this.get('model.length');
    }.property('@each')
  });

