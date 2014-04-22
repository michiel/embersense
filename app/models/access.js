var attr = DS.attr;

export default DS.Model.extend({
    requester : attr('string'),
    requestee : attr('string'),
    reason    : attr('string'),
    message   : attr('string'),
    sensors   : attr('string'),
    status    : attr('string')
  });
