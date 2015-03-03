var distPath = '../../../dist/compressed';

describe('Importing Torso Modules', function() {
  var env;

  beforeEach(function(done) {
    require('./clientCommonJsEnv')().done(function(environment) {
        env = environment;
        done();
      });
  });

  it('can import TorsoFormModel', function() {
    var TorsoFormModel = env.window.require('/../../main/javascript/backbone/models/TorsoFormModel');
    expect(TorsoFormModel).toBeDefined();
    expect(new TorsoFormModel()).toBeDefined();
  });
});