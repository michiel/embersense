var attr = DS.attr;

export default DS.Model.extend({
    requester : DS.hasOneFragment('requester'),
    requestee : DS.hasOneFragment('requestee'),
    reason    : attr('string'),
    message   : attr('string'),
    sensors   : attr('raw'),
    status    : attr('string')
  });
