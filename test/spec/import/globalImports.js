describe('Global Module imports', function() {
  var window, globalIndex,
      // Define the globals layout, each array is a global to verify
      //   and each item in the array is a step on the path from the window object.
      // The test below will verify that all items defined below exist on the window object.
      // e.g. ['Torso', 'Mixins', 'loading'] = window.Torso.Mixins.loading
      globals = [
        ['Torso'],
        ['Torso', 'Cell'],
        ['Torso', 'Collection'],
        ['Torso', 'Events'],
        ['Torso', 'Mixins'],
        ['Torso', 'Mixins', 'loading'],
        ['Torso', 'Mixins', 'cache'],
        ['Torso', 'Mixins', 'polling'],
        ['Torso', 'Mixins', 'validation'],
        ['Torso', 'Mixins', 'cell'],
        ['Torso', 'Model'],
        ['Torso', 'NestedCell'],
        ['Torso', 'NestedModel'],
        ['Torso', 'FormModel'],
        ['Torso', 'ServiceCell'],
        ['Torso', 'Router'],
        ['Torso', 'history'],
        ['Torso', 'Utils'],
        ['Torso', 'Utils', 'templateRenderer'],
        ['Torso', 'Utils', 'handlebarsUtils'],
        ['Torso', 'validation'],
        ['Torso', 'View'],
        ['Torso', 'ListView'],
        ['Torso', 'FormView']
      ];

  beforeAll(function(done) {
    require('./importEnv')('testEnv').done(function(pageWindow) {
      window = pageWindow;
      done();
    });
  });


  for (globalIndex = 0; globalIndex < globals.length; globalIndex++) {
    global = globals[globalIndex];
    it('has the expected "' + global.join('.')  + '" global.', function(global) {
      var globalPartIndex, nextGlobalKey, globalPart = window;
      for (globalPartIndex = 0; globalPartIndex < global.length; globalPartIndex++) {
        nextGlobalKey = global[globalPartIndex];
        globalPart = globalPart[nextGlobalKey];
        expect(globalPart).toBeDefined();
      }
    }.bind(this, global));
  }
});