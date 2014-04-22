var attr = DS.attr;

export default DS.Model.extend({
    requester : attr('shareuser'),
    requestee : attr('shareuser'),
    reason    : attr('string'),
    message   : attr('string'),
    sensors   : attr('string'),
    status    : attr('string')
  });
