var $ = require('jquery');
var TorsoView = require('../../modules/View');

describe('A View', function() {

  describe('when setting \'on\' listeners', function() {

    it('can route \'change\' events to view state', function() {
      var triggered = false;
      var OnView = TorsoView.extend({
        initialize: function() {
          this.on('change', function() { triggered = true; });
        }
      });
      var onView = new OnView();
      expect(triggered).toBe(false);
      onView.set('foo', true);
      expect(triggered).toBe(true);
    });

    it('can not interfere with view-created events', function() {
      var triggered = false;
      var OnView = TorsoView.extend({
        initialize: function() {
          this.on('my-view-event', function() { triggered = true; });
        }
      });
      var onView = new OnView();
      expect(triggered).toBe(false);
      onView.set('foo', true);
      expect(triggered).toBe(false);
      onView.viewState.trigger('my-view-event');
      expect(triggered).toBe(false);
      onView.trigger('my-view-event');
      expect(triggered).toBe(true);
    })

    it('uses appropriate context', function() {
      var triggered = false;
      var OnView = TorsoView.extend({
        initialize: function() {
          this.on('change', this.setTriggered);
        },

        setTriggered: function() {
          triggered = true;
        }
      });
      var onView = new OnView();
      expect(triggered).toBe(false);
      onView.set('foo', true);
      expect(triggered).toBe(true);
    });

    it('others can listenTo viewState change events', function() {
      var triggered = false;
      var myView = new TorsoView();

      var ListenToView = TorsoView.extend({
        initialize: function() {
          this.listenTo(myView, 'change', function() { triggered = true; });
        }
      });
      var listenToView = new ListenToView();
      expect(triggered).toBe(false);
      myView.set('foo', true);
      expect(triggered).toBe(true);
    });
  });

});