var attr      = DS.attr;
var belongsTo = DS.belongsTo;

export default DS.Model.extend({
    name           : attr('string'),
    value          : attr('string'),
    sensor         : belongsTo('sensor')
  });
