export default Ember.View.extend({
    tagName           : 'input',
    attributeBindings : ["start", "end"],
    start             : null,
    end               : null,

    didInsertElement: function() {
      this.$().daterangepicker(
        {
          format    : 'YYYY-MM-DD',
          startDate : this.get('start'),
          endDate   : this.get('end')
        },
        function(start, end) {
          this.set('startdate', start.format('DD-MM-YYYY'));
          this.set('enddate',   end.format('DD-MM-YYYY'));
         }.bind(this)
       );
    }
  });
