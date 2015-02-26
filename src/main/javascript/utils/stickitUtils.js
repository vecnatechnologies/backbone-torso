WebCore.Stickit.addHandler({
  selector: 'input[type="radio"]',
  events: ['change'],
  update: function($el, val) {
    $el.prop('checked', false);
    $el.filter('[value="'+val+'"]').prop('checked', true);
  },
  getVal: function($el) {
    return $el.filter(':checked').val();
  }
});