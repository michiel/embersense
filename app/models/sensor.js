var attr = DS.attr;

export default DS.Model.extend({
    name           : attr('string'),
    type           : attr('string'),
    device_type    : attr('string'),
    display_name   : attr('string'),
    pager_type     : attr('string'),
    data_type      : attr('string'),
    data_type_id   : attr('string'),
    data_structure : attr('string'),
    prettyName     : function() {
      return this.get('display_name') || this.get('name');
    }.property('name', 'display_name')
  });
