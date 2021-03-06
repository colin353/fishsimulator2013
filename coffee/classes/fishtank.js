// Generated by CoffeeScript 1.6.2
var FishTankCanvasController;

FishTankCanvasController = (function() {
  function FishTankCanvasController() {
    this.relinquishcontrol = false;
    this.pellets = [];
    this.pellets.push(new Pellet('pellet.json'));
    this.fishes = [];
    this.fishes.push(new Fish('clownfish.json'));
    this.fishes.push(new Fish('minnow.json'));
    this.fishes.push(new Fish('hermitcrab.json'));
    this.fishes.push(new Fish('pufferfish.json'));
    this.corals = [];
    this.corals.push(new Coral('TubeCoralOrange.json'));
    this.corals[0].position = {
      x: 200,
      y: 200
    };
    this.corals.push(new Coral('TubeCoralPink.json'));
    this.corals[1].position = {
      x: 200,
      y: 200
    };
    this.corals.push(new Coral('TubeCoralPurple.json'));
    this.corals[2].position = {
      x: 200,
      y: 200
    };
    this.corals.push(new Coral('BrainCoral.json'));
    this.corals[3].position = {
      x: 200,
      y: 200
    };
    this.tank = new Tank('TankBackground.jpg');
    this.machines = [];
    this.machines.push(new Machine('filter.json'));
    document.tank = this.tank;
    document.tankcontroller = this;
  }

  FishTankCanvasController.prototype.tick = function() {
    var a, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2, _ref3;

    this.tank.tick();
    if ((function() {
      var _i, _len, _ref, _results;

      _ref = this.machines;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        a = _ref[_i];
        _results.push(a != null);
      }
      return _results;
    }).call(this)) {
      a.tick();
    }
    _ref = this.corals;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      a = _ref[_i];
      if (a != null) {
        a.tick();
      }
    }
    _ref1 = this.fishes;
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      a = _ref1[_j];
      if (a != null) {
        a.tick();
      }
    }
    _ref2 = this.pellets;
    for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
      a = _ref2[_k];
      a.tick();
    }
    _ref3 = viewcontroller.inputstack;
    for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
      a = _ref3[_l];
      if (a.type === 'M') {
        document.tool.click(a.x, a.y);
      }
      if (a.type === 'MD') {
        document.tool.hold(a.x, a.y);
      }
    }
    return true;
  };

  return FishTankCanvasController;

})();
