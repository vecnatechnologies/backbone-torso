var _ = require('underscore');
var TorsoCell = require('./../../modules/Cell');
var TorsoNestedCell = require('./../../modules/NestedCell');
var TorsoModel = require('./../../modules/Model');
var TorsoNestedModel = require('./../../modules/NestedModel');
var TorsoServiceCell = require('./../../modules/ServiceCell');
var TorsoView = require('./../../modules/View');
var torsoRegistry = require('./../../modules/registry');

describe('The torso app registry', function() {
  beforeEach(function() {
    torsoRegistry.disposeAll();
    expect(_.size(torsoRegistry.cells)).toBe(0);
    expect(_.size(torsoRegistry.models)).toBe(0);
    expect(_.size(torsoRegistry.services)).toBe(0);
    expect(_.size(torsoRegistry.views)).toBe(0);
  });

  it('does not register cells when they are created by default', function() {
    new TorsoCell();
    expect(_.size(torsoRegistry.cells)).toBe(0);
  });

  it('does not register nested cells when they are created by default', function() {
    new TorsoNestedCell();
    expect(_.size(torsoRegistry.cells)).toBe(0);
  });

  it('does not register models when they are created by default', function() {
    new TorsoModel();
    expect(_.size(torsoRegistry.models)).toBe(0);
  });

  it('does not register nested models when they are created by default', function() {
    new TorsoNestedModel();
    expect(_.size(torsoRegistry.models)).toBe(0);
  });

  it('registers service cells when they are created by default', function() {
    new TorsoServiceCell();
    expect(_.size(torsoRegistry.services)).toBe(1);
  });

  it('registers views when they are created by default', function() {
    new TorsoView();
    expect(_.size(torsoRegistry.views)).toBe(1);
  });

  it('registers cells when they are created with register set to true', function() {
    new TorsoCell({}, { register : true });
    expect(_.size(torsoRegistry.cells)).toBe(1);
  });

  it('registers nested cells when they are created with register set to true', function() {
    new TorsoNestedCell({}, { register : true });
    expect(_.size(torsoRegistry.cells)).toBe(1);
  });

  it('registers models when they are created with register set to true', function() {
    new TorsoModel({}, { register : true });
    expect(_.size(torsoRegistry.models)).toBe(1);
  });

  it('registers nested models when they are created with register set to true', function() {
    new TorsoNestedModel({}, { register : true });
    expect(_.size(torsoRegistry.models)).toBe(1);
  });

  it('registers service cells when they are created with register set to true', function() {
    new TorsoServiceCell({}, { register : true });
    expect(_.size(torsoRegistry.services)).toBe(1);
  });

  it('registers views when they are created with register set to true', function() {
    new TorsoView({ register : true });
    expect(_.size(torsoRegistry.views)).toBe(1);
  });

  it('does not register cells when they are created with register set to false', function() {
    new TorsoCell({}, { register : false });
    expect(_.size(torsoRegistry.cells)).toBe(0);
  });

  it('does not register nested cells when they are created with register set to false', function() {
    new TorsoNestedCell({}, { register : false });
    expect(_.size(torsoRegistry.cells)).toBe(0);
  });

  it('does not register models when they are created with register set to false', function() {
    new TorsoModel({}, { register : false });
    expect(_.size(torsoRegistry.models)).toBe(0);
  });

  it('does not register nested models when they are created with register set to false', function() {
    new TorsoNestedModel({}, { register : false });
    expect(_.size(torsoRegistry.models)).toBe(0);
  });

  it('does not register service cells when they are created with register set to false', function() {
    new TorsoServiceCell({}, { register : false });
    expect(_.size(torsoRegistry.services)).toBe(0);
  });

  it('does not register views when they are created with register set to false', function() {
    new TorsoView({ register : false });
    expect(_.size(torsoRegistry.views)).toBe(0);
  });

  it('does not register cells when they are created with register set to null', function() {
    new TorsoCell({ register : null });
    expect(_.size(torsoRegistry.cells)).toBe(0);
  });

  it('does not register nested cells when they are created with register set to null', function() {
    new TorsoNestedCell({ register : null });
    expect(_.size(torsoRegistry.cells)).toBe(0);
  });

  it('does not register models when they are created with register set to null', function() {
    new TorsoModel({ register : null });
    expect(_.size(torsoRegistry.models)).toBe(0);
  });

  it('does not register nested models when they are created with register set to null', function() {
    new TorsoNestedModel({ register : null });
    expect(_.size(torsoRegistry.models)).toBe(0);
  });

  it('registers service cells when they are created with register set to null', function() {
    new TorsoServiceCell({ register : null });
    expect(_.size(torsoRegistry.services)).toBe(1);
  });

  it('registers views when they are created with register set to null', function() {
    new TorsoView({ register : null });
    expect(_.size(torsoRegistry.views)).toBe(1);
  });

  it('removes cells when they are disposed', function() {
    var cell = new TorsoCell({}, { register : true });
    expect(_.size(torsoRegistry.cells)).toBe(1);
    cell.dispose();
    expect(_.size(torsoRegistry.cells)).toBe(0);
  });

  it('removes nested cells when they are disposed', function() {
    var cell = new TorsoNestedCell({}, { register : true });
    expect(_.size(torsoRegistry.cells)).toBe(1);
    cell.dispose();
    expect(_.size(torsoRegistry.cells)).toBe(0);
  });

  it('removes models when they are disposed', function() {
    var model = new TorsoModel({}, { register : true });
    expect(_.size(torsoRegistry.models)).toBe(1);
    model.dispose();
    expect(_.size(torsoRegistry.models)).toBe(0);
  });

  it('removes nested models when they are disposed', function() {
    var model = new TorsoNestedModel({}, { register : true });
    expect(_.size(torsoRegistry.models)).toBe(1);
    model.dispose();
    expect(_.size(torsoRegistry.models)).toBe(0);
  });

  it('removes service cells when they are disposed', function() {
    var service = new TorsoServiceCell({}, { register : true });
    expect(_.size(torsoRegistry.services)).toBe(1);
    service.dispose();
    expect(_.size(torsoRegistry.services)).toBe(0);
  });

  it('removes views when they are disposed', function() {
    var view = new TorsoView({ register : true });
    expect(_.size(torsoRegistry.views)).toBe(1);
    view.dispose();
    expect(_.size(torsoRegistry.views)).toBe(0);
  });

  it('removes all cells when disposeAllCells() is called', function() {
    var cell1 = new TorsoCell({}, { register : true });
    spyOn(cell1, 'dispose').and.callThrough();
    var cell2 = new TorsoCell({}, { register : true });
    spyOn(cell2, 'dispose').and.callThrough();
    expect(_.size(torsoRegistry.cells)).toBe(2);
    torsoRegistry.disposeAllCells();
    expect(_.size(torsoRegistry.cells)).toBe(0);
    expect(cell1.dispose).toHaveBeenCalled();
    expect(cell2.dispose).toHaveBeenCalled();
  });

  it('removes all nested cells when disposeAllCells() is called', function() {
    var cell1 = new TorsoNestedCell({}, { register : true });
    spyOn(cell1, 'dispose').and.callThrough();
    var cell2 = new TorsoNestedCell({}, { register : true });
    spyOn(cell2, 'dispose').and.callThrough();
    expect(_.size(torsoRegistry.cells)).toBe(2);
    torsoRegistry.disposeAllCells();
    expect(_.size(torsoRegistry.cells)).toBe(0);
    expect(cell1.dispose).toHaveBeenCalled();
    expect(cell2.dispose).toHaveBeenCalled();
  });

  it('removes all models when disposeAllModels() is called', function() {
    var model1 = new TorsoModel({}, { register : true });
    spyOn(model1, 'dispose').and.callThrough();
    var model2 = new TorsoModel({}, { register : true });
    spyOn(model2, 'dispose').and.callThrough();
    expect(_.size(torsoRegistry.models)).toBe(2);
    torsoRegistry.disposeAllModels();
    expect(_.size(torsoRegistry.models)).toBe(0);
    expect(model1.dispose).toHaveBeenCalled();
    expect(model2.dispose).toHaveBeenCalled();
  });

  it('removes all nested models when disposeAllModels() is called', function() {
    var model1 = new TorsoNestedModel({}, { register : true });
    spyOn(model1, 'dispose').and.callThrough();
    var model2 = new TorsoNestedModel({}, { register : true });
    spyOn(model2, 'dispose').and.callThrough();
    expect(_.size(torsoRegistry.models)).toBe(2);
    torsoRegistry.disposeAllModels();
    expect(_.size(torsoRegistry.models)).toBe(0);
    expect(model1.dispose).toHaveBeenCalled();
    expect(model2.dispose).toHaveBeenCalled();
  });

  it('removes all service cells when disposeAllServices() is called', function() {
    var service1 = new TorsoServiceCell({}, { register : true });
    spyOn(service1, 'dispose').and.callThrough();
    var service2 = new TorsoServiceCell({}, { register : true });
    spyOn(service2, 'dispose').and.callThrough();
    expect(_.size(torsoRegistry.services)).toBe(2);
    torsoRegistry.disposeAllServices();
    expect(_.size(torsoRegistry.services)).toBe(0);
    expect(service1.dispose).toHaveBeenCalled();
    expect(service2.dispose).toHaveBeenCalled();
  });

  it('removes all views when disposeAllViews() is called', function() {
    var view1 = new TorsoView({ register : true });
    spyOn(view1, 'dispose').and.callThrough();
    var view2 = new TorsoView({ register : true });
    spyOn(view2, 'dispose').and.callThrough();
    expect(_.size(torsoRegistry.views)).toBe(2);
    torsoRegistry.disposeAllViews();
    expect(_.size(torsoRegistry.views)).toBe(0);
    expect(view1.isDisposed()).toBe(true);
    expect(view1.dispose).toHaveBeenCalled();
    expect(view2.isDisposed()).toBe(true);
    expect(view2.dispose).toHaveBeenCalled();
  });

  it('removes all cells when disposeAll() is called', function() {
    var cell1 = new TorsoCell({}, { register : true });
    spyOn(cell1, 'dispose').and.callThrough();
    var cell2 = new TorsoCell({}, { register : true });
    spyOn(cell2, 'dispose').and.callThrough();
    expect(_.size(torsoRegistry.cells)).toBe(2);
    torsoRegistry.disposeAll();
    expect(_.size(torsoRegistry.cells)).toBe(0);
    expect(cell1.dispose).toHaveBeenCalled();
    expect(cell2.dispose).toHaveBeenCalled();
  });

  it('removes all nested cells when disposeAll() is called', function() {
    var cell1 = new TorsoNestedCell({}, { register : true });
    spyOn(cell1, 'dispose').and.callThrough();
    var cell2 = new TorsoNestedCell({}, { register : true });
    spyOn(cell2, 'dispose').and.callThrough();
    expect(_.size(torsoRegistry.cells)).toBe(2);
    torsoRegistry.disposeAll();
    expect(_.size(torsoRegistry.cells)).toBe(0);
    expect(cell1.dispose).toHaveBeenCalled();
    expect(cell2.dispose).toHaveBeenCalled();
  });

  it('removes all models when disposeAll() is called', function() {
    var model1 = new TorsoModel({}, { register : true });
    spyOn(model1, 'dispose').and.callThrough();
    var model2 = new TorsoModel({}, { register : true });
    spyOn(model2, 'dispose').and.callThrough();
    expect(_.size(torsoRegistry.models)).toBe(2);
    torsoRegistry.disposeAll();
    expect(_.size(torsoRegistry.models)).toBe(0);
    expect(model1.dispose).toHaveBeenCalled();
    expect(model2.dispose).toHaveBeenCalled();
  });

  it('removes all nested models when disposeAll() is called', function() {
    var model1 = new TorsoNestedModel({}, { register : true });
    spyOn(model1, 'dispose').and.callThrough();
    var model2 = new TorsoNestedModel({}, { register : true });
    spyOn(model2, 'dispose').and.callThrough();
    expect(_.size(torsoRegistry.models)).toBe(2);
    torsoRegistry.disposeAll();
    expect(_.size(torsoRegistry.models)).toBe(0);
    expect(model1.dispose).toHaveBeenCalled();
    expect(model2.dispose).toHaveBeenCalled();
  });

  it('removes all service cells when disposeAllServices() is called', function() {
    var service1 = new TorsoServiceCell({}, { register : true });
    spyOn(service1, 'dispose').and.callThrough();
    var service2 = new TorsoServiceCell({}, { register : true });
    spyOn(service2, 'dispose').and.callThrough();
    expect(_.size(torsoRegistry.services)).toBe(2);
    torsoRegistry.disposeAll();
    expect(_.size(torsoRegistry.services)).toBe(0);
    expect(service1.dispose).toHaveBeenCalled();
    expect(service2.dispose).toHaveBeenCalled();
  });

  it('removes all views when disposeAll() is called', function() {
    var view1 = new TorsoView({ register : true });
    spyOn(view1, 'dispose').and.callThrough();
    var view2 = new TorsoView({ register : true });
    spyOn(view2, 'dispose').and.callThrough();
    expect(_.size(torsoRegistry.views)).toBe(2);
    torsoRegistry.disposeAll();
    expect(_.size(torsoRegistry.views)).toBe(0);
    expect(view1.isDisposed()).toBe(true);
    expect(view1.dispose).toHaveBeenCalled();
    expect(view2.isDisposed()).toBe(true);
    expect(view2.dispose).toHaveBeenCalled();
  });
});
