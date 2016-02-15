// Tests using jsDom are deprecated. Port tests to commonjs and add them to test/karma.

module.exports = function(viewClass, method) {
  spyOn(viewClass.prototype, method);
  viewClass.prototype[method].and.callThrough(function() {
    var recentCall = viewClass[method].calls.mostRecent();
    recentCall.object[method].apply(recentCall.args);
  });
};